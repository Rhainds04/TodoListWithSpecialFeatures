import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  textWithLineLight: {
    textDecorationLine: 'line-through',
    color: 'black',
  },
  textWithLineDark: {
    textDecorationLine: 'line-through',
    color: 'white',
  },
  textLight: {
    width: '60%',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  textDark: {
    width: '60%',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  icon: {
    width: '20%',
    height: 40,
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
