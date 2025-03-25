import { TouchableOpacity, Text, Image } from 'react-native';
import { useState } from 'react';

import cardIcon from '../../assets/images/check.png';
import chatGptIcon from '../../assets/images/chatgptLogo.png';
import chatGptIconLight from '../../assets/images/chatgptLogoWhite.png';

import humanLogo from '../../assets/images/profile-user.png';

import { s } from './CardTodo.Style';

export const CardTodo = ({ todo, onPress, deleteTodo, isDarkMode }) => {
  const imageSource = todo.isCompleted ? cardIcon : null;
  const isAiGenerated = todo.isAiGenerated
    ? isDarkMode
      ? chatGptIconLight
      : chatGptIcon
    : humanLogo;
  const textStyle = todo.isCompleted
    ? [
        isDarkMode ? s.textDark : s.textLight,
        isDarkMode ? s.textWithLineDark : s.textWithLineLight,
      ]
    : [isDarkMode ? s.textDark : s.textLight];

  return (
    <TouchableOpacity
      onLongPress={deleteTodo}
      onPress={onPress}
      style={s.container}
    >
      <Text style={textStyle}>{todo.title}</Text>
      <Image source={imageSource} style={s.icon} />
      <Image source={isAiGenerated} style={s.icon} />
    </TouchableOpacity>
  );
};
