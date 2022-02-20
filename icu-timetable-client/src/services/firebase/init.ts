import Constants from 'expo-constants';
import * as FirebaseCore from 'expo-firebase-core';
import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const GetFirebaseApp = () => {
  const firebaseApps = getApps();
  if (!firebaseApps.length) {
    const config = FirebaseCore.DEFAULT_WEB_APP_OPTIONS;
    const app = initializeApp(config as FirebaseCore.FirebaseOptions);
    if (process.env.STAGE === 'dev') {
      const host =
        Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';
      const auth = getAuth(app);
      connectAuthEmulator(auth, `http://${host}:9099`);
      const db = getFirestore(app);
      connectFirestoreEmulator(db, host, 8080);
    }

    return app;
  }
  return firebaseApps[0];
};

export { GetFirebaseApp };
