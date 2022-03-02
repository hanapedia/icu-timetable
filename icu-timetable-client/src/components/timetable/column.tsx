import React, { FC } from 'react';
import { View } from 'react-native';
import { RowLabel, ColLabel } from 'types/icuSpecificTypes';
import { TimetableCell } from 'components/timetable/cell';

type DaysColProps = {
  colLabel: ColLabel;
};

const TimetableCol: FC<DaysColProps> = ({ colLabel }) => {
  const rowLabels: RowLabel[] = [
    '1',
    '2',
    '3',
    'lunch',
    '4',
    '5',
    '6',
    '7',
    '8',
  ];
  return (
    <View
      style={
        colLabel === 'label'
          ? {
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'white',
            }
          : {
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'white',
            }
      }
    >
      {rowLabels.map((rowLabel) => (
        <TimetableCell
          key={`${rowLabel}/lable`}
          colLabel={'label'}
          rowLabel={rowLabel}
        />
      ))}
    </View>
  );
};
export { TimetableCol };
