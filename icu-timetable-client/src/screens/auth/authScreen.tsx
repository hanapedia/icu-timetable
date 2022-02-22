import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthFormData } from 'contexts/authContext';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from 'hooks/useAuth';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { authStyle } from 'styles/authStack/formStyles';

type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  return (
    <View style={authStyle.container}>
      <Text h2 style={authStyle.text}>
        Start using ICU Timetable App!
      </Text>
      <Button
        onPress={() => navigation.push('ID')}
        title='Get Started!'
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
        }}
        type='outline'
        raised
        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      <StatusBar style='auto' />
    </View>
  );
};

export { AuthScreen };
