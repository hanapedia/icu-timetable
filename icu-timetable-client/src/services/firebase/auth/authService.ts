import { GetFirebaseApp } from 'services/firebase/init';
import {
  getAuth,
  User,
  onAuthStateChanged,
  Unsubscribe,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
  connectAuthEmulator,
} from 'firebase/auth';

type AuthData = User | null;

type AuthStateChangeCallback = (authData: AuthData) => void;

interface AuthService {
  register: () => Promise<User | null>;
  authStateChangeHandler: (
    authStateChangeCallback: AuthStateChangeCallback
  ) => Unsubscribe;
}

const initAuth = () => {
  const auth = getAuth(GetFirebaseApp());
  if (process.env.AUTH_EMULATOR)
    connectAuthEmulator(auth, process.env.AUTH_EMULATOR);
  return auth;
};

// signs up user using firebase client SDK
// this also logs the user in
// null check required for return value
const register = async () => {
  try {
    const auth = initAuth();
    await setPersistence(auth, browserLocalPersistence);
    const userCredentials = await signInAnonymously(auth);
    return userCredentials.user;
  } catch (error) {
    return null;
  }
};

// handler triggered when user signs in or signs out
// since auth state persistance is set to local
// explicit signout must be performed to clear auth state
const authStateChangeHandler = (
  authStateChangeCallback: AuthStateChangeCallback
) => {
  const auth = initAuth();
  return onAuthStateChanged(auth, (currentUser) => {
    authStateChangeCallback(currentUser);
  });
};

const authService: AuthService = {
  register: register,
  authStateChangeHandler: authStateChangeHandler,
};

export { authService };
export type { AuthData };
