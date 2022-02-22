import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { authStyle } from 'styles/authStack/formStyles';

const GradeFormScreen = () => {
  return (
    <View style={authStyle.container}>
      <Text>ID</Text>
    </View>
  );
};

export { GradeFormScreen };
