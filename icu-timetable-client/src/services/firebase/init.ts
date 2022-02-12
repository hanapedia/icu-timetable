import { getApps, initializeApp } from 'firebase/app';

const GetFirebaseApp = () => {
  const firebaseApps = getApps();
  if (!firebaseApps.length) {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    };
    return initializeApp(firebaseConfig);
  }
  return firebaseApps[0];
};

export { GetFirebaseApp };
