import { GetFirebaseApp } from 'services/firebase/init';
import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

type AuthData = User;

interface AuthService {
  logIn: (email: string, password: string) => Promise<User | null>;
  logOut: () => Promise<boolean>;
  register: (email: string, password: string) => Promise<User | null>;
}

// signs in the user using firebase client SDK, make sure to null check on implementation
const logIn = async (email: string, password: string) => {
  try {
    const firebaseApp = GetFirebaseApp();
    const auth = getAuth(firebaseApp);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return null;
  }
};

// signs out the current user using firebase client SDK
const logOut = async () => {
  try {
    const firebaseApp = GetFirebaseApp();
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};

// signs up user using firebase client SDK
// this also logs the user in
// null check required for return value
const register = async (email: string, password: string) => {
  try {
    const firebaseApp = GetFirebaseApp();
    const auth = getAuth(firebaseApp);
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials.user;
  } catch (error) {
    return null;
  }
};

const authService: AuthService = {
  logIn: logIn,
  logOut: logOut,
  register: register,
};

export { authService };
export type { AuthData, AuthService };
