import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  appLight: { flex: 1, backgroundColor: '#f9f9f9' },
  appDark: { flex: 1, backgroundColor: '#121826' },

  header: { flex: 1, height: 100 },
  body: { flex: 5 },
  footer: { height: 70 },

  cardItemLight: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 10,
    backgroundColor: 'white',
  },
  cardItemDark: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 10,
    backgroundColor: '#7761FF',
  },

  sortBtnLight: {
    width: 70,
    height: 50,
    backgroundColor: '#5991ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortBtnDark: {
    width: 70,
    height: 50,
    backgroundColor: '#7761FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  searchAndSortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: 'none',
  },

  levelTextLight: {
    color: '#008000',
    width: 100,
    paddingLeft: 10,
    fontSize: 20,
  },
  levelTextDark: {
    color: '#FF10F0',
    width: 100,
    paddingLeft: 10,
    fontSize: 20,
  },
});
