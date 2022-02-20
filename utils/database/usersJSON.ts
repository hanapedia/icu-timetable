#!/usr/bin/env node
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';

type UserDoc = {
  uid: string;
  gradYear: number;
  matriMonth: 'april' | 'sept';
  majorType: 'double' | 'single' | 'minor' | 'undecided';
  major: string[];
  studyAbroad: boolean;
  schedules?: Schedules;
  // list of courseIds of all the courses that user has taken.
  // update based on the schedules
  courses: string[];
};

type Schedules = {
  // considering the potential scaling needs, nested object works fine
  '2019A'?: Schedule;
  '2019S'?: Schedule;
  '2019W'?: Schedule;
  '2020A'?: Schedule;
  '2020S'?: Schedule;
  '2020W'?: Schedule;
  '2021A'?: Schedule;
  '2021S'?: Schedule;
  '2021W'?: Schedule;
  '2022A'?: Schedule;
  '2022S'?: Schedule;
  '2022W'?: Schedule; // holds all the schedules of the user
};

// used in user document
type Schedule = {
  courses: CourseDocShort[]; // holds shortened course docs for all the courses in schedule
  sat: boolean;
  eigth: boolean;
};

// for displaying relevent data to the timetable
// without making query for each courses in a schedule
type CourseDocShort = {
  eName: string;
  jName: string;
  courseDocId: string;
  schedule: string[];
};

export const migrateUserCollection = async (
  db: admin.firestore.Firestore,
  colPath: string,
  file: string
) => {
  const colRef = db.collection(colPath);
  const batch = db.batch();
  try {
    const userDocs: UserDoc[] = await fs.readJson(file);
    for (const i in userDocs) {
      const docId = await userDocs[i].uid;
      const docRef = await colRef.doc(docId);
      const plainItem = await JSON.parse(JSON.stringify(userDocs[i]));

      await batch.set(docRef, plainItem);
    }
    await batch.commit();
    console.log(
      `migrated ${userDocs.length} documents to ${colPath}, successfully.`
    );
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
