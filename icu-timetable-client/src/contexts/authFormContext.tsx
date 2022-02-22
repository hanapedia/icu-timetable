import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';
import { Major } from 'services/firebase/firestore';

type AuthFormData = {
  gradYear: number;
  matriMonth: 'april' | 'sept';
  majorType: 'double' | 'single' | 'minor' | 'undecided';
  major: Major[] | null;
  studyAbroad: boolean;
};

type AuthFormState = {
  setData: Dispatch<SetStateAction<AuthFormData>>;
  data: AuthFormData;
};

const AuthFormContext = createContext<AuthFormState>({} as AuthFormState);

const AuthFormProvider: FC = ({ children }) => {
  const [data, setData] = useState<AuthFormData>({
    gradYear: 26,
    matriMonth: 'april',
    majorType: 'single',
    major: ['AMS'],
    studyAbroad: false,
  });
  return (
    <AuthFormContext.Provider value={{ data, setData }}>
      {children}
    </AuthFormContext.Provider>
  );
};

export { AuthFormContext, AuthFormProvider };
export type { AuthFormState, AuthFormData };
