import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  containerLight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
  },
  containerDark: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121826',
  },
  button: {
    padding: 10,
  },

  activeLight: {
    color: '#5991ff',
  },
  activeDark: {
    color: '#7761FF',
  },

  inactiveLight: {
    color: 'black',
  },
  inactiveDark: {
    color: 'white',
  },
});
