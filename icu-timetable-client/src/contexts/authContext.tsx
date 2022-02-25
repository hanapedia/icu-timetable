import React, { createContext, FC, useEffect, useState } from 'react';
import { authService } from 'services/firebase/auth/authService';
import { UserDoc } from 'services/firebase/firestore';
import { userService } from 'services/firebase/firestore/users/userService';
import { localStorageService } from 'services/local/storage/asyncStorage';
import { LOCAL_STORAGE_USER } from 'services/local/storage/storageKeys';
import { AuthFormData } from './authFormContext';

type AuthContextData = {
  authData: UserDoc | null;
  register: (authFormData: AuthFormData) => Promise<void>;
  unregister: () => Promise<void>;
  isLoading: boolean;
  registerLocal: (authFormData: AuthFormData) => Promise<void>;
  unregisterLocal: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({ children }) => {
  const [authData, setAuthData] = useState<UserDoc | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const register = async (authFormData: AuthFormData) => {
    try {
      setIsLoading(true);
      const uid = await authService.register();
      const _authData: UserDoc = await { uid: uid, ...authFormData };
      await userService.setUser(_authData);
      await setAuthData(_authData);
      await localStorageService.set(LOCAL_STORAGE_USER, _authData);
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const unregister = async () => {
    await authService.unregister();
    await setAuthData(null);
    await localStorageService.remove(LOCAL_STORAGE_USER);
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
      )) as UserDoc;
      await setAuthData(_authData);
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
      value={{
        authData,
        register,
        unregister,
        isLoading,
        registerLocal,
        unregisterLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextData };
