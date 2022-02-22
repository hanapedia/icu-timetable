import { Picker } from '@react-native-picker/picker';
import { AuthFormData } from 'contexts/authFormContext';
import { useAuthForm } from 'hooks/useAuthForm';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Major } from 'services/firebase/firestore';
import { authFormStyle } from 'styles/authStack/formStyles';

type Value = number | string | Major;

type PickerFormProps = {
  title: string;
  selected: any;
  onSelectedChange: (idValue: any, idIndex: number) => void;
  values: any[];
  labels: string[];
};

const PickerForm: FC<PickerFormProps> = ({
  title,
  selected,
  onSelectedChange,
  values,
  labels,
}) => {
  return (
    <View style={authFormStyle.pickerFormContainer}>
      <View style={authFormStyle.pickerTitleContainer}>
        <Text h4 style={authFormStyle.text}>
          {title}
        </Text>
      </View>
      <Picker
        selectedValue={selected}
        onValueChange={onSelectedChange}
        style={authFormStyle.pickerContainer}
      >
        {values.map((option, index) => (
          <Picker.Item
            label={labels[index]}
            value={option}
            key={index}
            style={authFormStyle.pickerOptionContainer}
          />
        ))}
      </Picker>
    </View>
  );
};

export { PickerForm };
