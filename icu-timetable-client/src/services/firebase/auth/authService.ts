import { GetFirebaseApp } from 'services/firebase/init';
import {
  getAuth,
  onAuthStateChanged,
  Unsubscribe,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import {
  localStorageService,
  LOCAL_STORAGE_USER,
} from 'services/local/storage';

type AuthStateChangeCallback = () => Promise<void>;

type AuthService = {
  register: () => Promise<string>;
  unregister: () => Promise<void>;
  authStateChangeHandler: (
    authStateChangeCallback: AuthStateChangeCallback
  ) => Unsubscribe;
};

const initAuth = () => {
  return getAuth(GetFirebaseApp());
};

// signs up user using firebase client SDK
// this also logs the user in
// null check required for return value
const register = async () => {
  try {
    const auth = initAuth();
    // await setPersistence(auth, browserLocalPersistence);
    const { user } = await signInAnonymously(auth);
    return user.uid;
  } catch (error) {
    throw new Error(`Unale to register anonymousely:${error}`);
  }
};

//signs out user
// should only be used for testing purposes
const unregister = async () => {
  try {
    const auth = initAuth();
    // await setPersistence(auth, browserLocalPersistence);
    await signOut(auth);
    return;
  } catch (error) {
    throw new Error(`Unale to register anonymousely:${error}`);
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
    try {
      if (currentUser) {
        authStateChangeCallback();
      } else {
        localStorageService.remove(LOCAL_STORAGE_USER);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const authService: AuthService = {
  register: register,
  authStateChangeHandler: authStateChangeHandler,
  unregister: unregister,
};

export { authService };
