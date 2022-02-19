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
            pivot: courses array in Schedule
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

type Database = {
  courses: {
    // has subcollections based on year and term
    '2019A': CourseDoc[];
    '2019S': CourseDoc[];
    '2019W': CourseDoc[];
    '2020A': CourseDoc[];
    '2020S': CourseDoc[];
    '2020W': CourseDoc[];
    '2021A': CourseDoc[];
    '2021S': CourseDoc[];
    '2021W': CourseDoc[];
    '2022A': CourseDoc[];
    '2022S': CourseDoc[];
    '2022W': CourseDoc[];
  };
  users: UserDoc[]; // each docs uses uid provided by auth service as id
  reviews: Review[]; // subcollection of Courses
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
  schedule: string[];
  room?: string;
  mode?: string;
  capacity?: number;
  instructor: string[];
  credit: string;
  difficultyAvg: number;
  excitementAvg: number;
  nRviews: number;
};

// for displaying relevent data to the timetable
// without making query for each courses in a schedule
type CourseDocShort = {
  eName: string;
  jName: string;
  courseID: number;
  schedule: string[];
};

type UserDoc = {
  uid: string;
  gradYear: number;
  matriMonth: 'april' | 'sept';
  majorType: 'double' | 'single' | 'minor' | 'undecided';
  major: string[];
  studyAbroad: boolean;
  schedules?: {
    // considering the potential scaling needs, nested object works fine
    '2019A'?: Schedule[];
    '2019S'?: Schedule[];
    '2019W'?: Schedule[];
    '2020A'?: Schedule[];
    '2020S'?: Schedule[];
    '2020W'?: Schedule[];
    '2021A'?: Schedule[];
    '2021S'?: Schedule[];
    '2021W'?: Schedule[];
    '2022A'?: Schedule[];
    '2022S'?: Schedule[];
    '2022W'?: Schedule[]; // holds all the schedules of the user
  };
  // list of courseIds of all the courses that user has taken.
  // update based on the schedules
  courses: string[];
};

// used in user document
type Schedule = {
  courses: CourseDocShort[]; // holds shortened course docs for all the courses in schedule
  sat: boolean;
  eigth: boolean;
};

// use in the subcollection of courses document
// subcolletion is required for scaling purpose
type Review = {
  userId: string;
  difficulty: number;
  excitement: number;
  comment?: string;
};
