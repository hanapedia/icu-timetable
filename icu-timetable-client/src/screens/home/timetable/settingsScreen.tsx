import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { globalStyle } from 'styles/globalStyle';

const TimetableSettingsScreen = () => {
  return (
    <View style={globalStyle.container}>
      <Text h2 style={globalStyle.text}>
        Timetable settings Screen
      </Text>
    </View>
  );
};

export { TimetableSettingsScreen };
