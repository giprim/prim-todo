import React from 'react';
import { StyleSheet, View } from 'react-native';

function ListSpacer() {
  return <View style={styles.spacer}></View>;
}
const styles = StyleSheet.create({
  spacer: {
    height: 5,
    padding: 5,
  },
});
export default ListSpacer;
