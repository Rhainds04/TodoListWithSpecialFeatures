import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { s } from './ChatGptButton.Style';

export const ChatGptButton = ({ handleInput, onPress, isDarkMode }) => {
  return (
    <View>
      <TouchableOpacity
        style={isDarkMode ? s.buttonDark : s.buttonLight}
        onPress={() => {
          handleInput();
          onPress();
        }}
      >
        <Text style={s.text}>
          <Icon name="memory" size={50} color="#fff" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
