import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { ColLabel, YearTerm } from 'types/icuSpecificTypes';
import { TimetableCol } from 'components/timetable/column';
import { CourseUi, CourseUiProps } from 'components/timetable/courseUi';
import { useTimetable } from 'hooks';

type TimetableUiProps = {
  yearTerm: YearTerm;
};

const TimetableUi: FC<TimetableUiProps> = ({ yearTerm }) => {
  const colLabels: ColLabel[] = ['M', 'TU', 'W', 'TH', 'F'];
  const { timetableData, mapCourses } = useTimetable();
  if (timetableData.timetable.sat) colLabels.push('SA');

  const courseUiProps = mapCourses(timetableData.timetable);
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
          {courseUiProps.map((props, index) => (
            <CourseUi key={index} {...props} />
          ))}
        </View>
      </View>
    </View>
  );
};

export { TimetableUi };
