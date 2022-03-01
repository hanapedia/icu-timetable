import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { Period, WeekDay } from 'types/icuSpecificTypes';

type CellProps = {
  weekDay: WeekDay;
  period: Period;
};

const TimetableCell: FC<CellProps> = ({ weekDay, period }) => {
  return period === 'label' || period === 'lunch' ? (
    <Pressable
      style={{
        borderWidth: 0.5,
        borderColor: 'black',
        height: period === 'lunch' ? '5%' : '4%',
        backgroundColor: 'grey',
      }}
      onPress={() => console.log(`${weekDay}/${period}`)}
    />
  ) : (
    <Pressable
      style={{
        borderWidth: 0.5,
        borderColor: 'black',
        height: '13%',
      }}
      onPress={() => console.log(`${weekDay}/${period}`)}
    />
  );
};

export { TimetableCell };
