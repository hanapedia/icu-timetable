import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { globalStyle } from 'styles/globalStyle';

const TimetableEditScreen = () => {
  return (
    <View style={globalStyle.container}>
      <Text h2 style={globalStyle.text}>
        Timetable edit Screen
      </Text>
    </View>
  );
};

export { TimetableEditScreen };
