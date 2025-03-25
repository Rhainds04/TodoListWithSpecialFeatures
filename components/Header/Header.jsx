import { Image, Text, View } from 'react-native';

import backgroundImage from '../../assets/images/logo.png';
import backgroundImageDark from '../../assets/images/logoDarkMode.png';

import { s } from './Header.Style';

export const Header = ({ isDarkMode }) => {
  return (
    <View style={s.container}>
      <Image
        source={isDarkMode ? backgroundImageDark : backgroundImage}
        style={s.backgroundImage}
      />
    </View>
  );
};
