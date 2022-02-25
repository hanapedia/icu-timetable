import RNPickerSelect, { Item } from 'react-native-picker-select';
import React, { FC } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

type PickerFormProps = {
  title: string;
  onSelectedChange: (idValue: any, idIndex: number) => void;
  items: Item[];
};

const SelectForm: FC<PickerFormProps> = ({
  title,
  onSelectedChange,
  items,
}) => {
  return (
    <View style={pickerSelectStyle.pickerFormContainer}>
      <View style={pickerSelectStyle.pickerTitleContainer}>
        <Text h4 style={pickerSelectStyle.pickerTitleText}>
          {title}
        </Text>
      </View>
      <View style={pickerSelectStyle.pickerContainer}>
        <RNPickerSelect
          onValueChange={onSelectedChange}
          items={items}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyle}
          Icon={() => {
            return <AntDesign name='down' size={10} color='grey' />;
          }}
          placeholder={{}}
        />
      </View>
    </View>
  );
};

const pickerFormContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'stretch',
  height: 80,
};

const pickerContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const pickerTitleContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const pickerTitleText: TextStyle = {
  textAlign: 'left',
};

const inputAndroid: TextStyle = {
  color: 'grey',
};

const inputAndroidContainer: ViewStyle = {
  borderBottomWidth: 0.6,
  borderBottomColor: 'grey',
  alignItems: 'center',
  justifyContent: 'center',
  width: 150,
  height: 30,
};

const placeholder: TextStyle = {
  color: 'grey',
};

const iconContainer: ViewStyle = {
  marginRight: 10,
};

const pickerSelectStyle = StyleSheet.create({
  pickerFormContainer: pickerFormContainer,
  pickerContainer: pickerContainer,
  pickerTitleContainer: pickerTitleContainer,
  pickerTitleText: pickerTitleText,
  inputAndroid: inputAndroid,
  inputAndroidContainer: inputAndroidContainer,
  placeholder: placeholder,
  iconContainer: iconContainer,
});

export { SelectForm };
