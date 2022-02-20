import Constants from 'expo-constants';
import * as FirebaseCore from 'expo-firebase-core';
import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, initializeAuth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore';

const GetFirebaseApp = () => {
  const firebaseApps = getApps();
  if (!firebaseApps.length) {
    const config = FirebaseCore.DEFAULT_WEB_APP_OPTIONS;
    const app = initializeApp(config as FirebaseCore.FirebaseOptions);
    const db = initializeFirestore(app, {
      ignoreUndefinedProperties: true,
    });
    const auth = initializeAuth(app);
    if (process.env.STAGE === 'dev') {
      const host =
        Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';
      connectAuthEmulator(auth, `http://${host}:9099`);
      connectFirestoreEmulator(db, host, 8080);
    }

    return app;
  }
  return firebaseApps[0];
};

export { GetFirebaseApp };
