type YearTerm =
  | '2019A'
  | '2019S'
  | '2019W'
  | '2020A'
  | '2020S'
  | '2020W'
  | '2021A'
  | '2021S'
  | '2021W'
  | '2022A'
  | '2022S'
  | '2022W';

type WeekDay = 'label' | 'M' | 'TU' | 'W' | 'TH' | 'F' | 'SA';

type Period = 'label' | '1' | '2' | '3' | 'lunch' | '4' | '5' | '6' | '7' | '8';

type MatriMonth = 'april' | 'sept';

type MajorType = 'double' | 'single' | 'minor' | 'undecided';

type GradYear = '20' | '21' | '22' | '23' | '24' | '25' | '26';

type Major =
  | 'UND'
  | 'ARC'
  | 'MUS'
  | 'LIT'
  | 'PHR'
  | 'ECO'
  | 'BUS'
  | 'EDU'
  | 'LED'
  | 'HST'
  | 'BIO'
  | 'CHM'
  | 'PHY'
  | 'MTH'
  | 'ISC'
  | 'LAW'
  | 'PPL'
  | 'POL'
  | 'IRL'
  | 'LNG'
  | 'PSY'
  | 'MCC'
  | 'ANT'
  | 'SOC'
  | 'AMS'
  | 'AST'
  | 'DPS'
  | 'ENV'
  | 'GSS'
  | 'GLS'
  | 'JPS'
  | 'PCS';

type Cells =
  | '1/SA'
  | '2/SA'
  | '3/SA'
  | '4/SA'
  | '5/SA'
  | '6/SA'
  | '7/SA'
  | '8/SA'
  | '1/M'
  | '2/M'
  | '3/M'
  | '4/M'
  | '5/M'
  | '6/M'
  | '7/M'
  | '8/M'
  | '1/TU'
  | '2/TU'
  | '3/TU'
  | '4/TU'
  | '5/TU'
  | '6/TU'
  | '7/TU'
  | '8/TU'
  | '1/W'
  | '2/W'
  | '3/W'
  | '4/W'
  | '5/W'
  | '6/W'
  | '7/W'
  | '8/W'
  | '1/TH'
  | '2/TH'
  | '3/TH'
  | '4/TH'
  | '5/TH'
  | '6/TH'
  | '7/TH'
  | '8/TH'
  | '1/F'
  | '2/F'
  | '3/F'
  | '4/F'
  | '5/F'
  | '6/F'
  | '7/F'
  | '8/F';

export type {
  YearTerm,
  WeekDay,
  Period,
  Major,
  MajorType,
  MatriMonth,
  GradYear,
  Cells,
};
