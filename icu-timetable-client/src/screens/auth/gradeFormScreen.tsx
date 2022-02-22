import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PickerForm } from 'components/form/pickerForm';
import { StatusBar } from 'expo-status-bar';
import { useAuthForm } from 'hooks/useAuthForm';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { IdAliases, MatriMonthAliases } from 'res/alias';
import { MatriMonth } from 'services/firebase/firestore';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type GradeFormScreenProps = NativeStackScreenProps<AuthStackParamList, 'ID'>;

const GradeFormScreen = ({ navigation }: GradeFormScreenProps) => {
  const authForm = useAuthForm();

  const idPickerOptions = Object.values(IdAliases);
  const idPickerLabels = Object.keys(IdAliases);
  const [idPickerValue, setIdPickerValue] = useState(idPickerOptions[5]);
  const idPickerHandler = (idValue: number, idIndex: number) => {
    setIdPickerValue(idValue);
    authForm.setData({ ...authForm.data, gradYear: idValue });
  };

  const matriMonthOptions = Object.keys(MatriMonthAliases);
  const matriMonthAliasValues = Object.values(MatriMonthAliases);
  const matriMonthLabels = matriMonthAliasValues.map(
    (labelObject) => labelObject.en
  );
  const [matriMonthPickerValue, setMatriMonthPickerValue] = useState(
    matriMonthOptions[1]
  );
  const matriMonthPickerHandler = (idValue: MatriMonth, idIndex: number) => {
    setMatriMonthPickerValue(idValue);
    authForm.setData({ ...authForm.data, matriMonth: idValue });
  };
  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <PickerForm
          title='ID'
          selected={idPickerValue}
          onSelectedChange={idPickerHandler}
          values={idPickerOptions}
          labels={idPickerLabels}
        />
        <PickerForm
          title='Matriculation Month'
          selected={matriMonthPickerValue}
          onSelectedChange={matriMonthPickerHandler}
          values={matriMonthOptions}
          labels={matriMonthLabels}
        />
      </View>
      <View style={authFormStyle.submitGroup}>
        <Button
          onPress={() => navigation.push('Major')}
          title='Next'
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

export { GradeFormScreen };
