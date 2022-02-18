import { AuthFormData } from 'contexts/authContext';

type UserDocument = {
  uid: string;
} & AuthFormData;

export type { UserDocument };
