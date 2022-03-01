/* 
Schema
    Courses Table:
        Subcolletions:
        Courses of different year and term
            Subcollections:
                Reviews:
                p-key: courseId(term + year) + userID
    Users Table:
        p-key: uid
        Schedules:

RelationShips
    Many-to-Many:
        Users : Courses 
            pivot: Schedules
        Schedules : Courses
            pivot: courses array in TimeTable
    One-to-Many:
        Users : Schedules
            f-key: userId
        Users : Reviews
            f-key: userId
        Course : Reviews
            f-key: CourseId

All queries for retrieving documents
    Courses:
        via properties
    Users:
        via properties
        Schedules:
        as a user propertiy
    Reviews:
        via courseId
        via userId


*/

import {
  Cells,
  GradYear,
  Major,
  MajorType,
  MatriMonth,
} from 'types/icuSpecificTypes';

const RootTables = {
  courses: 'allCourses',
  users: 'users', // each docs uses uid provided by auth service as id
  reviews: 'reviews', // subcollection of Courses
};

type CourseDoc = {
  courseId: number;
  term: string;
  year: number;
  code: string;
  lang: string;
  subId?: string;
  eName: string;
  jName: string;
  schedule?: string[];
  room?: string;
  mode?: string;
  capacity?: number;
  instructor: string[];
  credit: string;
  difficultyAvg: number;
  excitementAvg: number;
  nRviews: number;
};

type UserDoc = {
  uid: string;
  gradYear: GradYear;
  matriMonth: MatriMonth;
  majorType: MajorType;
  major: Major[];
  studyAbroad: boolean;
  timeTables?: TimeTables;
  // list of courseIds of all the courses that user has taken.
  // update based on the schedules
  courses?: string[];
};

type TimeTables = {
  // considering the potential scaling needs, nested object works fine
  '2019A'?: TimeTable;
  '2019S'?: TimeTable;
  '2019W'?: TimeTable;
  '2020A'?: TimeTable;
  '2020S'?: TimeTable;
  '2020W'?: TimeTable;
  '2021A'?: TimeTable;
  '2021S'?: TimeTable;
  '2021W'?: TimeTable;
  '2022A'?: TimeTable;
  '2022S'?: TimeTable;
  '2022W'?: TimeTable; // holds all the schedules of the user
};

// used in user document
type TimeTable = {
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
  schedule: Cells[];
};

// use in the subcollection of courses document
// subcolletion is required for scaling purpose
type Review = {
  userId: string;
  difficulty: number;
  excitement: number;
  comment?: string;
};

export { RootTables };
export type {
  UserDoc,
  CourseDoc,
  TimeTable,
  TimeTables,
  CourseDocShort,
  Review,
};
