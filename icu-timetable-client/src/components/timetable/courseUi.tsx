import { usePreference } from 'hooks';
import React, { FC } from 'react';
import { ColorValue, View } from 'react-native';
import { Text } from 'react-native-elements';

type CourseUiProps = {
  top: string;
  left: string;
  height: string;
  width: string;
  eName: string;
  jName: string;
  courseDocId: string;
  color: ColorValue;
};

const CourseUi: FC<CourseUiProps> = ({
  top,
  left,
  height,
  width,
  color,
  eName,
  jName,
}) => {
  const {
    preference: { language },
  } = usePreference();
  return (
    <View
      style={{
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: color,
        top: top,
        left: left,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      }}
    >
      <Text
        style={{ textAlign: 'center' }}
        allowFontScaling
        textBreakStrategy={'simple'}
        adjustsFontSizeToFit
      >
        {language === 'en' ? eName : jName}
      </Text>
    </View>
  );
};

export { CourseUi };
export type { CourseUiProps };
