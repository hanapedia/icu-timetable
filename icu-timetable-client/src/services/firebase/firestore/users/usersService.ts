import {
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
  where,
} from 'firebase/firestore';
import {
  UserDoc,
  initFirestore,
  RootTables,
} from 'services/firebase/firestore';

type UserService = {
  setUser: (userDoc: UserDoc) => Promise<void>;
  getUserById: (uid: string) => Promise<UserDoc | null>;
  getUsersByProps: (params: QueryParams) => Promise<UserDoc[] | null>;
};

type QueryParams = {
  major?: string[]; // up to two
  gradYear?: number[]; // up to three
  majorType?: string[]; //up to three
  studyAbroad?: boolean;
  course?: string;
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
      schedules: userDoc.schedules,
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
      schedules: data.schedules,
      courses: data.courses,
    };
  },
};

const setUser = async (userDoc: UserDoc) => {
  const db = initFirestore();
  const userDocRef = doc(db, RootTables.users, userDoc.uid).withConverter(
    userConverter
  );
  await setDoc(userDocRef, userDoc);
};

const getUserById = async (uid: string): Promise<UserDoc | null> => {
  const db = initFirestore();
  const userDocRef = doc(db, RootTables.users, uid).withConverter(
    userConverter
  );
  const userSnap = await getDoc(userDocRef);
  return userSnap.exists() ? userSnap.data() : null;
};

const getUsersByProps = async (
  params: QueryParams
): Promise<UserDoc[] | null> => {
  const db = initFirestore();
  const usersColRef = collection(db, RootTables.users).withConverter(
    userConverter
  );
  const queryConstraints: QueryConstraint[] = [];
  const userDocs: UserDoc[] = [];

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
