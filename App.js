import 'react-native-get-random-values';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { v4 as uuid } from 'uuid';

import AppLayout from './src/components/AppLayout';
import TodoItem from './src/components/TodoItem';
import ListSpacer from './src/components/ListSpacer';
import theme from './src/config/theme';
import Heading from './src/components/Heading';

const initialTodos = [
  {
    id: 1,
    todo:
      'I have to spend at least eight hours coding so it reflects on my time doctor',
  },
  {
    id: 2,
    todo:
      'I have to spend at least eight hours coding so it reflects on my time doctor',
  },
];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    setTodos((prev) => [...prev, { id: uuid(), todo: text }]);
    setText('');
  };

  useMemo(() => console.log({ todos }), [todos]);
  return (
    <AppLayout>
      <View style={styles.container}>
        <View>
          <Heading title='Tasks' />
          <FlatList
            data={todos}
            renderItem={({ item }) => <TodoItem todo={item.todo} />}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={ListSpacer}
          />
        </View>
        <View style={styles.inputHolder}>
          <TextInput
            style={styles.input}
            placeholder='Add a todo'
            placeholderTextColor={theme.light}
            onChangeText={setText}
            value={text}
            blurOnSubmit={true}
            onSubmitEditing={handleSubmit}
            autoFocus={true}
            multiline={true}
          />
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputHolder: {
    alignSelf: 'flex-end',
    backgroundColor: theme.mdDark,
    width: '95%',
    alignSelf: 'center',
    height: 60,
    margin: 'auto',
    borderRadius: 100 / 3,
    marginBottom: 15,
    color: theme.light,
  },
  input: {
    width: '100%',
    padding: 20,
    fontSize: 18,
    color: theme.white,
  },
});
