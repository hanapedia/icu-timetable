import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { GetFirebaseApp } from '../init';

export const initFirestore = () => {
  return getFirestore(GetFirebaseApp());
};
