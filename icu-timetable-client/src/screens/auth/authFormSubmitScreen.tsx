import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type AuthFormSubmitScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Major'
>;

const AuthFormSubmitScreen = ({ navigation }: AuthFormSubmitScreenProps) => {
  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <Text h2 style={globalStyle.text}>
          Start using ICU Timetable App!
        </Text>
      </View>
      <View style={authFormStyle.submitGroup}>
        <Button
          onPress={() => navigation.push('ID')}
          title='Get Started!'
          buttonStyle={authFormStyle.buttonBox}
          type='outline'
          raised
          titleStyle={authFormStyle.buttonText}
          containerStyle={authFormStyle.buttonContainer}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

export { AuthFormSubmitScreen };
