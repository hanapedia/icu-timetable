import React, { FC } from 'react';
import { View } from 'react-native';
import { WeekDay, YearTerm } from 'types/icuSpecificTypes';
import { TimetableCol } from 'components/timetable/column';
import { CourseUi } from 'components/timetable/courseUi';

type TimetableUiProps = {
  yearTerm: YearTerm;
};

const TimetableUi: FC<TimetableUiProps> = ({ yearTerm }) => {
  const weekDays: WeekDay[] = ['M', 'TU', 'W', 'TH', 'F'];
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <TimetableCol weekDay='label' />
      <View style={{ flex: 10, flexDirection: 'row' }}>
        {weekDays.map((weekDay) => (
          <TimetableCol key={weekDay} weekDay={weekDay} />
        ))}
        <CourseUi />
      </View>
    </View>
  );
};

export { TimetableUi };
