import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import theme from '../config/theme';

function TodoItem({ item, renderRightAction, handleChecked, todosArray }) {
  const [important, setImportant] = useState(false);
  const [checkBoxState, toggleCheckBoxState] = useState(false);
  const handleExpand = () => {};

  const handleTodoChecked = (value) => {
    toggleCheckBoxState(value);
    handleChecked(item, checkBoxState);
  };

  useEffect(() => {
    if (item.done) toggleCheckBoxState(item.done);
  }, []);

  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableOpacity
        style={[styles.container, checkBoxState ? styles.done : '']}
        onPress={handleExpand}>
        <CheckBox
          disabled={false}
          value={checkBoxState}
          onValueChange={handleTodoChecked}
          tintColors={{ true: theme.success, false: theme.success }}
          tintColor={theme.success}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.common,
            styles.text,
            { textDecorationLine: checkBoxState ? 'line-through' : 'none' },
          ]}>
          {item.todo}
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
  done: {
    backgroundColor: theme.done,
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
