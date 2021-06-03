import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../config/theme';

export default function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name='trash-can' color={theme.white} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.danger,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100 / 3,
    marginLeft: 8,
  },
});
