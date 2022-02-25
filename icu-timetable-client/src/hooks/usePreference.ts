import { PreferenceContext } from 'contexts/preferenceContext';
import { useContext } from 'react';

export const useAuthForm = () => {
  const context = useContext(PreferenceContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
