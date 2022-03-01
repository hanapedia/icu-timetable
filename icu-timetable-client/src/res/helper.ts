import { YearTerm } from 'types/icuSpecificTypes';

export const destructureYearTermString = (yearTerm: YearTerm) => {
  const termAlias = yearTerm.slice(4);
  return {
    year: +yearTerm.slice(0, 4),
    term:
      termAlias === 'S' ? 'Spring' : termAlias === 'A' ? 'Autumn' : 'Winter',
  };
};
