import { AuthFormContext } from 'contexts/authFormContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthFormContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
