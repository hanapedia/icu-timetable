import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const CourseUi = () => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '39%',
        width: '20%',
        backgroundColor: 'red',
        bottom: '13%',
        left: 0,
      }}
    >
      <Text h1>{'Hello'}</Text>
    </View>
  );
};

export { CourseUi };
