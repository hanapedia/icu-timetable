import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React, { useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Button, ButtonGroup, Text } from 'react-native-elements';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type AuthFormSubmitScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Major'
>;

const AuthFormSubmitScreen = ({ navigation }: AuthFormSubmitScreenProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <View style={authFormStyle.formEntryContainer}>
          <View style={authFormStyle.formEntryTitleContainer}>
            <Text h4 style={authFormStyle.formEntryTitleText}>
              {'Are you considering to study abroad'}
            </Text>
          </View>
          <View style={authFormStyle.formElementContainer}>
            <ButtonGroup
              buttons={['Yes', 'No']}
              selectedIndex={selectedIndex}
              onPress={(value) => setSelectedIndex(value)}
            />
          </View>
        </View>
      </View>
      <View style={authFormStyle.submitGroup}>
        <Button
          onPress={() => {}}
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
