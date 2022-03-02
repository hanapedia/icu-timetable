import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { convertScheduleToCoord } from 'res';

type CourseUiProps = {
  top: string;
  left: string;
  height: string;
  width: string;
};

const CourseUi: FC<CourseUiProps> = ({ top, left, height, width }) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: 'red',
        top: top,
        left: left,
      }}
    >
      <Text h1>{'Hello'}</Text>
    </View>
  );
};

export { CourseUi };
