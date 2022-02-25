import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

type Preference = { language: 'en' | 'jp'; darkMode: boolean };

type PreferenceContextData = {
  preference: Preference;
  setPreference: Dispatch<SetStateAction<Preference>>;
};

const PreferenceContext = createContext<PreferenceContextData>(
  {} as PreferenceContextData
);

const PreferenceProvider: FC = ({ children }) => {
  const [preference, setPreference] = useState<Preference>({
    language: 'en',
    darkMode: false,
  });
  return (
    <PreferenceContext.Provider value={{ preference, setPreference }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export { PreferenceProvider, PreferenceContext };
export type { PreferenceContextData };
