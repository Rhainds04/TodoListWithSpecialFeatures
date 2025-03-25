import { Text, View, TouchableOpacity } from 'react-native';
import { s } from './TabBottomMenu.Style';

export const Footer = ({
  all,
  inProgress,
  done,
  activeTab,
  setActiveTab,
  isDarkMode,
}) => {
  function handleTabPress(tab) {
    setActiveTab(tab);
  }

  return (
    <View style={isDarkMode ? s.containerDark : s.containerLight}>
      <TouchableOpacity onPress={() => handleTabPress('All')} style={s.button}>
        <Text
          style={
            activeTab === 'All'
              ? isDarkMode
                ? s.activeDark
                : s.activeLight
              : isDarkMode
              ? s.inactiveDark
              : s.inactiveLight
          }
        >
          All({all})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTabPress('InProgress')}
        style={s.button}
      >
        <Text
          style={
            activeTab === 'InProgress'
              ? isDarkMode
                ? s.activeDark
                : s.activeLight
              : isDarkMode
              ? s.inactiveDark
              : s.inactiveLight
          }
        >
          InProgress({inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Done')} style={s.button}>
        <Text
          style={
            activeTab === 'Done'
              ? isDarkMode
                ? s.activeDark
                : s.activeLight
              : isDarkMode
              ? s.inactiveDark
              : s.inactiveLight
          }
        >
          Done({done})
        </Text>
      </TouchableOpacity>
    </View>
  );
};
