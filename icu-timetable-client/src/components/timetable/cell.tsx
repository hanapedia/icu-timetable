import React, { FC } from 'react';
import { Pressable } from 'react-native';
import { RowLabel, ColLabel } from 'types/icuSpecificTypes';

type CellProps = {
  colLabel: ColLabel;
  rowLabel: RowLabel;
};

const TimetableCell: FC<CellProps> = ({ colLabel, rowLabel }) => {
  return rowLabel === 'label' || rowLabel === 'lunch' ? (
    <Pressable
      style={{
        borderWidth: 0.5,
        borderColor: 'black',
        height: '17.5%',
        backgroundColor: 'grey',
        flex: 1,
      }}
      onPress={() => console.log(`${colLabel}/${rowLabel}`)}
    />
  ) : (
    <Pressable
      style={{
        borderWidth: 0.5,
        borderColor: 'black',
        flex: 2,
      }}
      onPress={() => console.log(`${colLabel}/${rowLabel}`)}
    />
  );
};

export { TimetableCell };
