

import { StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  card: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ff63475e',
  },
  heading: {
    fontSize: 35,
    lineHeight: 35,
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  }
});
