import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';

import theme from '../config/theme';

function TodoItem({ todo }) {
  const [important, setImportant] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <TouchableOpacity style={styles.container}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
        tintColors={{ true: theme.success, false: theme.success }}
        tintColor={theme.success}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.common,
          styles.text,
          { textDecorationLine: toggleCheckBox ? 'line-through' : 'none' },
        ]}>
        {todo}
      </Text>

      <MaterialCommunityIcons
        style={[
          styles.common,
          { fontSize: 28, marginLeft: 5, color: theme.important },
        ]}
        onPress={() => setImportant((prev) => !prev)}
        name={important ? 'star' : 'star-outline'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.light,
    borderRadius: 100 / 3,
    padding: 10,
    lineHeight: 1.5,
  },
  common: {
    fontSize: 18,
    color: theme.mdDark,
    width: '15%',
  },
  text: {
    width: '75%',
    marginLeft: 10,
    fontSize: 20,
  },
});

export default TodoItem;
