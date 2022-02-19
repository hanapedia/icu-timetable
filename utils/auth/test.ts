#!/usr/bin/env node
import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  sendEmailVerification,
  signInAnonymously,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import 'dotenv/config';

const firebaseApp = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
});

const signUpAndVerifyEmail = async () => {
  const auth = getAuth(firebaseApp);
  connectAuthEmulator(auth, 'http://localhost:9099');
  try {
    const userCredentials = await signInAnonymously(
      auth
      // process.env.TEST_EMAIL,
      // process.env.TEST_PASSWORD
    );
    const credential = await EmailAuthProvider.credential(
      process.env.TEST_EMAIL,
      process.env.TEST_PASSWORD
    );
    await linkWithCredential(userCredentials.user, credential);
    // await sendEmailVerification(auth.currentUser);
  } catch (error) {
    console.error(error);
  }
};

signUpAndVerifyEmail();
