import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { AuthFormData } from './authContext';

type AuthFormState = {
  setAuthFormData: Dispatch<SetStateAction<AuthFormData>>;
  authFormData: AuthFormData;
};

const AuthFormContext = createContext<AuthFormState>({} as AuthFormState);

const AuthFormProvider: FC = ({ children }) => {
  const [authFormData, setAuthFormData] = useState<AuthFormData>({
    gradYear: 26,
    matriMonth: 'april',
    majorType: 'single',
    major: ['AMS'],
    studyAbroad: false,
  });
  return (
    <AuthFormContext.Provider value={{ authFormData, setAuthFormData }}>
      {children}
    </AuthFormContext.Provider>
  );
};

export { AuthFormContext, AuthFormProvider };
export type { AuthFormState };
