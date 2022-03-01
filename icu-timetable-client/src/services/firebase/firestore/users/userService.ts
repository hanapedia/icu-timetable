import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  UserDoc,
  initFirestore,
  RootTables,
  TimeTable,
} from 'services/firebase/firestore';
import { CourseDocShort } from 'services/firebase/firestore/structure';
import { Major } from 'types/icuSpecificTypes';

type UserService = {
  setUser: (userDoc: UserDoc) => Promise<void>;
  getUserById: (uid: string) => Promise<UserDoc | null>;
  getUserByFields: (params: QueryParams) => Promise<UserDoc[] | null>;
  updateUser: (uid: string, userFields: UpdatableUserFields) => Promise<void>;
  updateUserTimetable: (
    uid: string,
    termAndYear: string,
    courseDocShorts: CourseDocShort[]
  ) => Promise<void>;
};

type QueryParams = {
  major?: string[]; // up to two
  gradYear?: number[]; // up to three
  majorType?: string[]; //up to three
  studyAbroad?: boolean;
  course?: string;
};

type UpdatableUserFields = {
  majorType?: 'double' | 'single' | 'minor' | 'undecided';
  major?: Major[];
  studyAbroad?: boolean;
};

const userConverter = {
  toFirestore(userDoc: UserDoc): DocumentData {
    return {
      uid: userDoc.uid,
      gradYear: userDoc.gradYear,
      matriMonth: userDoc.matriMonth,
      majorType: userDoc.majorType,
      major: userDoc.major,
      studyAbroad: userDoc.studyAbroad,
      schedules: userDoc.timeTables,
      courses: userDoc.courses,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserDoc {
    const data = snapshot.data(options);
    // add validation
    return {
      uid: data.uid,
      gradYear: data.gradYear,
      matriMonth: data.matriMonth,
      majorType: data.majorType,
      major: data.major,
      studyAbroad: data.studyAbroad,
      timeTables: data.timeTables,
      courses: data.courses,
    };
  },
};

// sets a user document
const setUser = async (userDoc: UserDoc) => {
  const db = initFirestore();
  const userDocRef = doc(db, RootTables.users, userDoc.uid).withConverter(
    userConverter
  );
  await setDoc(userDocRef, userDoc);
};

// get a user document with matching uid
// retunrs null if no match
const getUserById = async (uid: string): Promise<UserDoc | null> => {
  const db = initFirestore();
  const userDocRef = doc(db, RootTables.users, uid).withConverter(
    userConverter
  );
  const userSnap = await getDoc(userDocRef);
  return userSnap.exists() ? userSnap.data() : null;
};

// get user documents(s) with fields matching params
// returns null if no match
const getUserByFields = async (
  params: QueryParams
): Promise<UserDoc[] | null> => {
  const db = initFirestore();
  const usersColRef = collection(db, RootTables.users).withConverter(
    userConverter
  );
  // array to hold wuery constraints retrieved from param
  const queryConstraints: QueryConstraint[] = [];
  // array to return user documents
  const userDocs: UserDoc[] = [];

  // check each parameter and add constraints if defined
  if (params.major !== undefined)
    queryConstraints.push(where('major', 'array-contains-any', params.major));
  if (params.gradYear !== undefined)
    queryConstraints.push(
      where('gradYear', 'array-contains-any', params.gradYear)
    );
  if (params.majorType !== undefined)
    queryConstraints.push(
      where('majorType', 'array-contains-any', params.majorType)
    );
  if (params.studyAbroad !== undefined)
    queryConstraints.push(where('studyAbroad', '==', params.studyAbroad));
  if (params.course !== undefined)
    queryConstraints.push(where('courses', 'array-contains', params.course));

  const usersQuery = query(usersColRef, ...queryConstraints);
  const usersQuerySnap = await getDocs(usersQuery);
  usersQuerySnap.forEach((userDoc) => {
    userDocs.push(userDoc.data());
  });

  return userDocs.length > 0 ? userDocs : null;
};

// update user information such as major and studyAbroad
// use updateUserTimetable for updating timetables
const updateUser = async (uid: string, userFields: UpdatableUserFields) => {
  const db = initFirestore();
  const userDocRef = doc(db, RootTables.users, uid).withConverter(
    userConverter
  );
  await updateDoc(userDocRef, userFields);
};

// update user time table
// pass an array of short CourseDocs
const updateUserTimetable = async (
  uid: string,
  termAndYear: string,
  courseDocShorts: CourseDocShort[]
) => {
  const db = initFirestore();
  const userDocRef = doc(db, RootTables.users, uid).withConverter(
    userConverter
  );
  // generate document field for updating nested object
  const scheduleKey = `shcedules.${termAndYear}`;

  // check if the timetable includes saturday or eigth period courses
  let sat = false;
  let eigth = false;
  const includedCourses = courseDocShorts.map((courseDocShort) => {
    if (!sat || !eigth) {
      const scheduleString = courseDocShort.schedule.join();
      if (scheduleString.includes('SA')) sat = true;
      if (scheduleString.includes('8')) eigth = true;
    }
    return courseDocShort.courseDocId;
  });
  const timeTable: TimeTable = {
    courses: courseDocShorts,
    sat: sat,
    eigth: eigth,
  };
  await updateDoc(userDocRef, {
    [scheduleKey]: timeTable,
    courses: arrayUnion(...includedCourses),
  });
};

export const userService: UserService = {
  setUser: setUser,
  getUserById: getUserById,
  getUserByFields: getUserByFields,
  updateUser: updateUser,
  updateUserTimetable: updateUserTimetable,
};
export type { QueryParams, UpdatableUserFields };
