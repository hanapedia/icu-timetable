import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { authStyle } from 'styles/authStack/formStyles';

const MajorFormScreen = () => {
  return (
    <View style={authStyle.container}>
      <Text>Major</Text>
    </View>
  );
};

export { MajorFormScreen };
