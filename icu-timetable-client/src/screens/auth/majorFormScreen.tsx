import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SelectForm } from 'components/form/selectForm';
import { StatusBar } from 'expo-status-bar';
import { useAuthForm } from 'hooks';
import { AuthStackParamList } from 'navigation/auth/authStackNavigator';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { MajorAliases, MajorTypeAliases } from 'res/alias';
import { authFormStyle } from 'styles/authStack/formStyles';
import { globalStyle } from 'styles/globalStyle';

type MajorFormScreenProps = NativeStackScreenProps<AuthStackParamList, 'Major'>;

const MajorFormScreen = ({ navigation }: MajorFormScreenProps) => {
  const { data, getSelectFormProps } = useAuthForm();

  const { items: majorTypeSelectItems, selectHandler: majorTypeSelectHandler } =
    getSelectFormProps('majorType', MajorTypeAliases);
  const { items: majorSelectItems, selectHandler: majorSelectHandler } =
    getSelectFormProps('major', MajorAliases);
  const { selectHandler: minorSelectHandler } = getSelectFormProps(
    'minor',
    MajorAliases
  );

  return (
    <View style={globalStyle.container}>
      <View style={authFormStyle.formGroup}>
        <SelectForm
          title='Major Type'
          onSelectedChange={majorTypeSelectHandler}
          items={majorTypeSelectItems}
        />
        <SelectForm
          title='Major 1'
          onSelectedChange={majorSelectHandler}
          items={majorSelectItems}
        />
        {data.majorType === 'double' || data.majorType === 'minor' ? (
          <SelectForm
            title='Major 2'
            onSelectedChange={minorSelectHandler}
            items={majorSelectItems}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={authFormStyle.submitGroup}>
        <Button
          onPress={() => navigation.push('Other')}
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

export { MajorFormScreen };
