import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { s } from './ButtonAdd.Style';

export const ButtonAdd = ({ onPress, isDarkMode }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isDarkMode ? s.buttonDark : s.buttonLight}
    >
      <Text style={s.text}>
        <Icon name={'add'} size={50} color="#fff" />
      </Text>
    </TouchableOpacity>
  );
};
