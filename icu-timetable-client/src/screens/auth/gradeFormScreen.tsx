import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SelectForm } from 'components/form/selectForm';
import { StatusBar } from 'expo-status-bar';
import { useAuthForm } from 'hooks';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { GradYearAliases, MatriMonthAliases } from 'res/alias';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type GradeFormScreenProps = NativeStackScreenProps<AuthStackParamList, 'ID'>;

const GradeFormScreen = ({ navigation }: GradeFormScreenProps) => {
  const { getSelectFormProps } = useAuthForm();
  const { items: gradYearSelectItems, selectHandler: gradYearSelectHandler } =
    getSelectFormProps('gradYear', GradYearAliases);
  const {
    items: matrMonthSelectItems,
    selectHandler: matriMonthSelectHandler,
  } = getSelectFormProps('matriMonth', MatriMonthAliases);

  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <SelectForm
          title='Graduation Year'
          onSelectedChange={gradYearSelectHandler}
          items={gradYearSelectItems}
        />
        <SelectForm
          title='Matriculation Month'
          onSelectedChange={matriMonthSelectHandler}
          items={matrMonthSelectItems}
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
