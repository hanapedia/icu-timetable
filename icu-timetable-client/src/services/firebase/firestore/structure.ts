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
            pivot: courses array in Timetable
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
  Schedule,
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
  schedule?: Schedule;
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
  timetables?: Timetables;
  // list of courseIds of all the courses that user has taken.
  // update based on the schedules
  courses?: string[];
};

type Timetables = {
  // considering the potential scaling needs, nested object works fine
  '2019A'?: Timetable;
  '2019S'?: Timetable;
  '2019W'?: Timetable;
  '2020A'?: Timetable;
  '2020S'?: Timetable;
  '2020W'?: Timetable;
  '2021A'?: Timetable;
  '2021S'?: Timetable;
  '2021W'?: Timetable;
  '2022A'?: Timetable;
  '2022S'?: Timetable;
  '2022W'?: Timetable; // holds all the schedules of the user
};

// used in user document
type Timetable = {
  courses: CourseDocShort[]; // holds shortened course docs for all the courses in schedule
  sat: boolean;
  eigth: boolean;
};

// for displaying relevent data to the Timetable
// without making query for each courses in a schedule
type CourseDocShort = {
  eName: string;
  jName: string;
  courseDocId: string;
  schedule: Schedule;
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
  Timetable,
  Timetables,
  CourseDocShort,
  Schedule,
  Review,
};
