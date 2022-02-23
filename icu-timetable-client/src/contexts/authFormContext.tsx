import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Item } from 'react-native-picker-select';
import {
  AliasObject,
  GradYearAliases,
  MajorAliases,
  MajorTypeAliases,
  MatriMonthAliases,
} from 'res/alias';
import {
  GradYear,
  Major,
  MajorType,
  MatriMonth,
  UserDoc,
} from 'services/firebase/firestore';
import {
  localStorageService,
  LOCAL_STORAGE_USER,
} from 'services/local/storage';

type AuthFormData = {
  gradYear: GradYear;
  matriMonth: MatriMonth;
  majorType: MajorType;
  major: Major[];
  studyAbroad: boolean;
};

type AuthFormState = {
  setData: Dispatch<SetStateAction<AuthFormData>>;
  data: AuthFormData;
  getSelectFormProps: (
    type: SelectFormType,
    aliasObject: AliasObject
  ) => { items: Item[]; selectHandler: (value: any, index: number) => void };
};

type SelectFormType =
  | 'gradYear'
  | 'matriMonth'
  | 'majorType'
  | 'major'
  | 'minor';

const AuthFormContext = createContext<AuthFormState>({} as AuthFormState);

const AuthFormProvider: FC = ({ children }) => {
  const [data, setData] = useState<AuthFormData>({
    gradYear: Object.keys(GradYearAliases)[0] as GradYear,
    matriMonth: Object.keys(MatriMonthAliases)[0] as MatriMonth,
    majorType: Object.keys(MajorTypeAliases)[0] as MajorType,
    major: [Object.keys(MajorAliases)[0] as Major],
    studyAbroad: false,
  });

  const getSelectFormProps = (
    selectFormType: SelectFormType,
    aliasObject: AliasObject
  ) => {
    const items = getSelectItems(aliasObject);
    let onSelectChange: (value: any, index: number) => void;
    switch (selectFormType) {
      case 'gradYear':
        onSelectChange = (value: GradYear, index: number) => {
          setData({ ...data, gradYear: value });
        };
        break;
      case 'matriMonth':
        onSelectChange = (value: MatriMonth, index: number) => {
          setData({ ...data, matriMonth: value });
        };
        break;
      case 'majorType':
        onSelectChange = (value: MajorType, index: number) => {
          setData({ ...data, majorType: value });
        };
        break;
      case 'major':
        onSelectChange = (value: Major, index: number) => {
          const major = data.major;
          major.splice(0, 1);
          setData({ ...data, major: [value, ...major] });
        };
        break;
      case 'minor':
        onSelectChange = (value: Major, index: number) => {
          const major = data.major;
          major.splice(1, 1);
          setData({ ...data, major: [...major, value] });
        };
        break;
    }
    return { items: items, selectHandler: onSelectChange };
  };

  useEffect(() => {
    const setUserForm = async () => {
      let _data = (await localStorageService.get(
        LOCAL_STORAGE_USER
      )) as UserDoc | null;
      if (_data) {
        await setData({
          gradYear: _data.gradYear,
          matriMonth: _data.matriMonth,
          majorType: _data.majorType,
          major: _data.major,
          studyAbroad: _data.studyAbroad,
        });
      }
    };

    setUserForm();
  });
  return (
    <AuthFormContext.Provider
      value={{
        data,
        setData,
        getSelectFormProps,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};

const getSelectItems = (aliasObject: AliasObject) => {
  return Object.keys(aliasObject).map((key) => {
    return { label: aliasObject[key].en, value: key } as Item;
  });
};

export { AuthFormContext, AuthFormProvider };
export type { AuthFormState, AuthFormData };
