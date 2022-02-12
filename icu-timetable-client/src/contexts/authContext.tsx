import React, { FC } from 'react';
import { AuthData, AuthService } from 'services/firebase/auth/authService';

type AuthContextData = {
  authData: AuthData;
  authService: AuthService;
};

const AuthProvider: FC = () => {
  return <div> AuthProvider: FC</div>;
};

export default AuthProvider;
