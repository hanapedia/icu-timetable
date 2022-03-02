import React, { FC } from 'react';
import { View } from 'react-native';
import { ColLabel, YearTerm } from 'types/icuSpecificTypes';
import { TimetableCol } from 'components/timetable/column';
import { CourseUi } from 'components/timetable/courseUi';
import { convertScheduleToCoord } from 'res';

type TimetableUiProps = {
  yearTerm: YearTerm;
};

const TimetableUi: FC<TimetableUiProps> = ({ yearTerm }) => {
  const colLabels: ColLabel[] = ['M', 'TU', 'W', 'TH', 'F', 'SA'];
  const coordinateArray = convertScheduleToCoord(
    {
      M: [5, 6, 7],
      TU: ['*4'],
      W: [1, 2],
    },
    true,
    true
  );
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ height: '5%', flexDirection: 'row' }}></View>
      <View style={{ height: '95%', flexDirection: 'row' }}>
        <View style={{ width: '10%', backgroundColor: 'red' }}>
          <TimetableCol colLabel={'label'} />
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
          }}
        >
          {colLabels.map((colLabel) => (
            <TimetableCol key={colLabel} colLabel={colLabel} />
          ))}
          {coordinateArray.map((coords) => (
            <CourseUi
              key={coords.height + coords.width}
              top={coords.top}
              left={coords.left}
              height={coords.height}
              width={coords.width}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export { TimetableUi };
