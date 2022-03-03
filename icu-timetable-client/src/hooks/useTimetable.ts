import { TimetableContext } from 'contexts/timetableContext';
import { useContext } from 'react';

export const useTimetable = () => {
  const context = useContext(TimetableContext);

  if (!context) {
    throw new Error('useTimetable must be used within an AuthProvider');
  }

  return context;
};
