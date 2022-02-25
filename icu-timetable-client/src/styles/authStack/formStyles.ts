import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const formGroup: ViewStyle = {
  flex: 5,
  backgroundColor: '#fff',
  alignItems: 'stretch',
  justifyContent: 'center',
};

const submitGroup: ViewStyle = {
  flex: 3,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const text: TextStyle = {
  textAlign: 'left',
};

const formEntryContainer: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 160,
};

const formElementContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const formEntryTitleContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '60%',
};

const formEntryTitleText: TextStyle = {
  textAlign: 'center',
};

const buttonContainer: ViewStyle = {
  width: '40%',
  // marginHorizontal: 40,
  // marginVertical: 10,
};

const buttonBox: ViewStyle = {
  borderColor: 'rgba(78, 116, 289, 1)',
};

const buttonText: TextStyle = {
  color: 'rgba(78, 116, 289, 1)',
};

const selectedButtonContainer: ViewStyle = {
  width: '50%',
  justifyContent: 'space-between',
};

const selectedButtonBox: ViewStyle = {
  backgroundColor: 'rgba(78, 116, 289, 1)',
};

const selectedButtonText: TextStyle = {
  color: 'white',
};

export const authFormStyle = StyleSheet.create({
  formGroup: formGroup,
  submitGroup: submitGroup,
  text: text,
  formEntryContainer: formEntryContainer,
  formElementContainer: formElementContainer,
  formEntryTitleContainer: formEntryTitleContainer,
  formEntryTitleText: formEntryTitleText,
  buttonContainer: buttonContainer,
  buttonBox: buttonBox,
  buttonText: buttonText,
  selectedButtonContainer: selectedButtonContainer,
  selectedButtonBox: selectedButtonBox,
  selectedButtonText: selectedButtonText,
});
