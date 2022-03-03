import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { usePreference } from 'hooks';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Switch, Text } from 'react-native-elements';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const { preference, setPreference } = usePreference();
  const [checked, setChecked] = useState(true);

  const languageSwitchHandler = (value: boolean) => {
    setPreference({ ...preference, language: value ? 'en' : 'jp' });
    setChecked(value);
  };

  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <View style={authFormStyle.formEntryContainer}>
          <View style={authFormStyle.formEntryTitleContainer}>
            <Text h2 style={authFormStyle.formEntryTitleText}>
              {checked
                ? 'Start using ICU Timetable App!'
                : 'ICU Timetableを始めよう！'}
            </Text>
          </View>
          <View style={authFormStyle.formElementContainer}>
            <Text h4>{'日本語'}</Text>
            <Switch
              value={checked}
              onValueChange={languageSwitchHandler}
              style={{ marginHorizontal: 15 }}
              color={'rgba(78, 116, 289, 1)'}
            />
            <Text h4>{'English'}</Text>
          </View>
        </View>
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

export { AuthScreen };
