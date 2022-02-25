import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from 'hooks/useAuth';
import { useAuthForm } from 'hooks/useAuthForm';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, ButtonGroup, Text } from 'react-native-elements';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type AuthFormSubmitScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Major'
>;

const AuthFormSubmitScreen = ({ navigation }: AuthFormSubmitScreenProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, setData } = useAuthForm();
  const { isLoading, register } = useAuth();

  const selectedHandler = (index: number) => {
    setSelectedIndex(index);
    setData({ ...data, studyAbroad: [true, false][index] });
  };
  const registerHandler = async () => {
    try {
      await register(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <View style={authFormStyle.formEntryContainer}>
          <View style={authFormStyle.formEntryTitleContainer}>
            <Text h4 style={authFormStyle.formEntryTitleText}>
              {'Are you considering to study abroad?'}
            </Text>
          </View>
          <View style={authFormStyle.formElementContainer}>
            <ButtonGroup
              buttons={['Yes', 'No']}
              selectedIndex={selectedIndex}
              onPress={selectedHandler}
              buttonStyle={authFormStyle.buttonBox}
              containerStyle={authFormStyle.selectedButtonContainer}
              textStyle={authFormStyle.buttonText}
              selectedButtonStyle={authFormStyle.selectedButtonBox}
              selectedTextStyle={authFormStyle.selectedButtonText}
            />
          </View>
        </View>
      </View>
      <View style={authFormStyle.submitGroup}>
        <Button
          onPress={registerHandler}
          title='Get Started!'
          buttonStyle={authFormStyle.buttonBox}
          type='outline'
          raised
          titleStyle={authFormStyle.buttonText}
          containerStyle={authFormStyle.buttonContainer}
          loading={isLoading}
          loadingProps={{ color: 'rgba(78, 116, 289, 1)' }}
        />
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

export { AuthFormSubmitScreen };
