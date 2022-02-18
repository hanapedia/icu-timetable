import React, { createContext, FC, useEffect, useState } from 'react';
import { authService } from 'services/firebase/auth/authService';
import { UserDocument } from 'services/firebase/firestore/users/usersService';
import { localStorageService } from 'services/local/storage/asyncStorage';
import { LOCAL_STORAGE_USER } from 'services/local/storage/storageKeys';

type AuthContextData = {
  authData: UserDocument | null;
  register: (authFormData: AuthFormData) => Promise<void>;
  isLoading: boolean;
  registerLocal: (authFormData: AuthFormData) => Promise<void>;
  unregisterLocal: () => Promise<void>;
};

type AuthFormData = {
  gradYear: number;
  matriMonth: 'april' | 'sept';
  majorType: 'double' | 'single' | 'minor' | 'undecided';
  major: string[];
  studyAbroad: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({ children }) => {
  const [authData, setAuthData] = useState<UserDocument | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const register = async (authFormData: AuthFormData) => {
    try {
      const uid = await authService.register();
      const _authData = await { uid: uid, ...authFormData };
      await setAuthData(_authData);
      await localStorageService.set(LOCAL_STORAGE_USER, _authData);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  // only for bypassing firebase authentication
  // #NO_FIREBASE_TEST use this tag to locate test code
  const registerLocal = async (authFormData: AuthFormData) => {
    try {
      const uid = 'locallygenerateduid';
      const _authData = { uid: uid, ...authFormData };
      setAuthData(_authData);
      await localStorageService.set(LOCAL_STORAGE_USER, _authData);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  // only for bypassing firebase authentication
  // #NO_FIREBASE_TEST use this tag to locate test code
  const unregisterLocal = async () => {
    setAuthData(null);
    await localStorageService.remove(LOCAL_STORAGE_USER);
  };

  // callback passed to authStateChangeHandler
  const authStateChangeCallback = async () => {
    try {
      const _authData = (await localStorageService.get(
        LOCAL_STORAGE_USER
      )) as UserDocument;
      await setAuthData(_authData);
      await setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  useEffect(() => {
    // sets the states inside of handler
    const unsubscribe = authService.authStateChangeHandler(
      authStateChangeCallback
    );

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider
      value={{ authData, register, isLoading, registerLocal, unregisterLocal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextData, AuthFormData };
