import React, { createContext, FC, useEffect, useState } from 'react';
import { AuthData, authService } from 'services/firebase/auth/authService';

type AuthContextData = {
  authData: AuthData | null;
  register: () => Promise<boolean>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const register = async () => {
    const _authData = await authService.register();
    if (_authData) {
      await setAuthData(_authData);
      return true;
    }
    return false;
  };

  // callback passed to authStateChangeHandler
  const authStateChangeCallback = (_authData: AuthData) => {
    setAuthData(_authData);
    setIsLoading(false);
  };

  useEffect(() => {
    // sets the states inside of handler
    const unsubscribe = authService.authStateChangeHandler(
      authStateChangeCallback
    );

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider value={{ authData, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
export type { AuthContextData };
