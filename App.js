import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AppLayout from './src/components/AppLayout';
import TodoItem from './src/components/TodoItem';
import { v4 as uuid4 } from 'uuid';
import ListSpacer from './src/components/ListSpacer';

const initialTodos = [
  {
    id: () => uuid4(),
    todo:
      'I have to spend at least eight hours coding so it reflects on my time doctor',
  },
  {
    id: () => uuid4(),
    todo:
      'I have to spend at least eight hours coding so it reflects on my time doctor',
  },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <AppLayout>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item.todo} />}
        keyExtractor={({ id }) => id.toString()}
        ItemSeparatorComponent={ListSpacer}
      />

      {/* <View style={styles.container}>
        <TodoItem todo='I have to spend at least eight hours coding so it reflects on my time doctor' />
  </View> */}
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
