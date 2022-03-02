import { Period, Schedule, WeekDay, YearTerm } from 'types/icuSpecificTypes';
import { cellWidths, cellHeights } from 'res/units';

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

type CellCoordinates = {
  top: string; // %
  left: string; // %
  height: string; // %
  width: string; // %
};

type AMPMPeriods = {
  AM: Period[]; // morening courses
  PM: Period[]; // afternoon courses
  LF: Period[]; // long fourth courses
};

type GroupedSchedule = {
  [key: string]: AMPMPeriods;
};

// take Schedule array and returns array cotaining coordinates for absolute positioning
// the cells will be in chunks if they are connected vertically
const convertScheduleToCoord = (
  schedule: Schedule,
  eigth: boolean = false,
  sat: boolean = false
): CellCoordinates[] => {
  // group schedule
  const groupedSchedule = groupSchedule(schedule);

  let cellCoordinates: CellCoordinates[] = [];
  for (const weekDay in schedule) {
    let xOffsetAndWidth = getXOffsetAndWidth(weekDay as WeekDay, sat);
    for (const periodGroupKey in groupedSchedule[weekDay]) {
      let periodGroup =
        groupedSchedule[weekDay][periodGroupKey as keyof AMPMPeriods];
      if (periodGroup[0]) {
        let basePeriod = periodGroup[0];
        let yOffsetAndHeight = getYOffsetAndHeight(
          basePeriod,
          periodGroup.length,
          eigth
        );
        cellCoordinates.push({ ...xOffsetAndWidth, ...yOffsetAndHeight });
      }
    }
  }

  return cellCoordinates;
};

const getXOffsetAndWidth = (weekDay: WeekDay, sat: boolean) => {
  const unit = sat ? cellWidths.sat : cellWidths.defualt;
  const percentage =
    weekDay === 'M'
      ? 0
      : weekDay === 'TU'
      ? unit
      : weekDay === 'W'
      ? unit * 2
      : weekDay === 'TH'
      ? unit * 3
      : weekDay === 'F'
      ? unit * 4
      : unit * 5;
  return { left: `${percentage}%`, width: `${unit}%` };
};

const getYOffsetAndHeight = (
  period: Period,
  nPeriods: number,
  eigth: boolean
) => {
  const unit = eigth ? cellHeights.baseEigth : cellHeights.base;
  let topPercentage =
    period === '*4'
      ? unit * 6.5
      : period <= 3
      ? unit * 2 * (period - 1)
      : unit * 2 * (period - 1) + unit;
  let heightPercentage = nPeriods * unit * 2;
  return { top: `${topPercentage}%`, height: `${heightPercentage}%` };
};

// group schedule into AM PM and LF periods
const groupSchedule = (schedule: Schedule): GroupedSchedule => {
  const groupedSchedule: GroupedSchedule = {};
  for (const weekDay in schedule) {
    let AM: Period[] = [];
    let PM: Period[] = [];
    let LF: Period[] = [];
    schedule[weekDay]?.forEach((period: Period) => {
      if (period === '*4') {
        LF.push(period);
      } else {
        period <= 3 ? AM.push(period) : PM.push(period);
      }
    });
    groupedSchedule[weekDay] = {
      AM: AM,
      PM: PM,
      LF: LF,
    };
  }
  return groupedSchedule;
};

export { destructureYearTermString, convertScheduleToCoord };
