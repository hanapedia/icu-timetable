import { Cells, YearTerm } from 'types/icuSpecificTypes';

// take YYYYT and convert to YYYY and Term
// egs. 2022S to 2022 and Spring
const destructureYearTermString = (yearTerm: YearTerm) => {
  const termAlias = yearTerm.slice(4);
  return {
    year: +yearTerm.slice(0, 4),
    term:
      termAlias === 'S' ? 'Spring' : termAlias === 'A' ? 'Autumn' : 'Winter',
  };
};

// take Schedule array and returns array cotaining coordinates for absolute positioning
const convertScheduleToCoord = (Schedule: Cells[]) => {};

export { destructureYearTermString };
