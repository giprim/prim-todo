import React from 'react';
import { StyleSheet, Text } from 'react-native';
import theme from '../config/theme';

function Heading({ title }) {
  return <Text style={styles.heading}>{title}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    color: theme.highLight,
    fontWeight: 'bold',
    fontSize: 26,
    marginVertical: 20,
    paddingLeft: 10,
  },
});
export default Heading;
