import React, { FC } from 'react';
import { View } from 'react-native';
import { Period, WeekDay } from 'types/icuSpecificTypes';
import { TimetableCell } from 'components/timetable/cell';

type DaysColProps = {
  weekDay: WeekDay;
};

const TimetableCol: FC<DaysColProps> = ({ weekDay }) => {
  const periods: Period[] = [
    'label',
    '1',
    '2',
    '3',
    'lunch',
    '4',
    '5',
    '6',
    '7',
  ];
  return weekDay === 'label' ? (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
      }}
    >
      {periods.map((period) => (
        <TimetableCell
          key={`${period}/lable`}
          weekDay={'label'}
          period={period}
        />
      ))}
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      {periods.map((period) => (
        <TimetableCell
          key={`${period}/${weekDay}`}
          weekDay={weekDay}
          period={period}
        />
      ))}
    </View>
  );
};
export { TimetableCol };
