import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import theme from '../config/theme';

function AppLayout({ children }) {
  return <View style={styles.layout}>{children}</View>;
}
const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 10,
    height: '100%',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.dark,
  },
});

export default AppLayout;
