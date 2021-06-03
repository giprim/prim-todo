import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import theme from '../config/theme';

function TodoItem({ todo, renderRightAction }) {
  const [important, setImportant] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const handleExpand = () => {};
  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableOpacity style={styles.container} onPress={handleExpand}>
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
            { fontSize: 18, marginLeft: 5, color: theme.important },
          ]}
          onPress={() => setImportant((prev) => !prev)}
          name={important ? 'star' : 'star-outline'}
        />
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.mdDark,
    borderRadius: 100 / 3,
    padding: 10,
    lineHeight: 1.5,
  },
  common: {
    fontSize: 16,
    color: theme.light,
    width: '15%',
  },
  text: {
    width: '75%',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default TodoItem;
