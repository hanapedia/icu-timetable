#!/usr/bin/env node
import * as admin from 'firebase-admin';
import * as csv from '@fast-csv/parse';

export class CourseDoc {
  courseId: number;
  term: string;
  year: number;
  code: string;
  lang: string;
  subId?: string;
  eName: string;
  jName: string;
  schedule: string[];
  room?: string;
  mode?: string;
  capacity?: number;
  instructor: string[];
  credit: string;
}

type CourseCSVRow = {
  courseId: string;
  term: string;
  year: string;
  code: string;
  lang: string;
  subId: string;
  eName: string;
  jName: string;
  schedule: string;
  room: string;
  mode: string;
  capacity: string;
  instructor: string;
  credit: string;
};

export const migrateCoursesCollection = async (
  db: admin.firestore.Firestore,
  colPath: string,
  file: string
) => {
  const colRef = db.collection(colPath);

  const data: CourseDoc[] = await ReadCoursesCSV(file);
  const batchSize = 500;
  const batchNum = Math.ceil(data.length / batchSize);

  for (let batchN = 0; batchN < batchNum; batchN++) {
    const batch = db.batch();
    const batchData = data.slice(batchN * batchSize, (batchN + 1) * batchSize);
    for (const item of batchData) {
      const docId = generateCourseDocId(item);
      const docRef = colRef.doc(docId);

      // as firestore does not support custom prototypes, convert to plain object
      const plainItem = JSON.parse(JSON.stringify(item));

      batch.set(docRef, plainItem);
    }
    try {
      await batch.commit();
      console.log(
        `migrated batch ${batchN}(${batchN * batchSize}~${
          (batchN + 1) * batchSize
        }), successfully`
      );
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
  console.log('Migration completed. Firestore updated.');
};

const ReadCoursesCSV = (path: string) => {
  return new Promise<any>((resolve, reject) => {
    const AllCourses: CourseDoc[] = [];
    csv
      .parseFile(path, { headers: true })
      .on('error', (error) => reject(error))
      .on('data', (course: CourseCSVRow) => {
        let courseJSONEntry: CourseDoc = new CourseDoc();
        for (const header in course) {
          switch (header) {
            case 'courseId':
            case 'year':
              courseJSONEntry[header] = +course[header];
              break;
            case 'schedule':
              courseJSONEntry.schedule = course.schedule.split(',');
              break;
            case 'instructor':
              courseJSONEntry.instructor = course.instructor.split('/');
              break;
            case 'credit':
              if (course.credit.includes('-')) {
                courseJSONEntry.credit = (+course.credit * -1).toString();
                break;
              }
            case 'subId':
            case 'room':
            case 'mode':
            case 'capacity':
              if (course[header] == '') break;
            default:
              courseJSONEntry[header] = course[header];
          }
        }
        console.log(courseJSONEntry);
        AllCourses.push(courseJSONEntry);
      })
      .on('end', (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(AllCourses);
      });
  });
};

const generateCourseDocId = (doc: CourseDoc) => {
  const { courseId, year, term } = doc;
  return year.toString().concat(term.charAt(0), courseId.toString());
};
