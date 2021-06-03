import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLayout from './src/components/AppLayout';
import TodoItem from './src/components/TodoItem';
import ListSpacer from './src/components/ListSpacer';
import theme from './src/config/theme';
import Heading from './src/components/Heading';
import ListItemDeleteAction from './src/components/ListItemDeleteAction';

const STORE_TODO = 'STORE_TODO';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const storeData = async () => {
    console.log({ todos });
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(STORE_TODO, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewTodo = async () => {
    setTodos((prev) => [...prev, { id: uuid(), todo: text }]);
  };

  const handleSubmit = async () => {
    if (text) await handleNewTodo();
    await storeData();
    setText('');
  };

  const fetchData = async () => {
    try {
      const localData = await AsyncStorage.getItem(STORE_TODO);
      if (localData !== null) return setTodos(JSON.parse(localData));
    } catch (e) {
      console.error({ e });
    }
  };

  const handleDelete = (message) => {
    const newTodos = todos.filter((value) => value.id !== message.id);
    setTodos(newTodos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <View style={styles.container}>
        <View>
          <Heading title='Tasks' />
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem
                todo={item.todo}
                renderRightAction={() => (
                  <ListItemDeleteAction onPress={() => handleDelete(item)} />
                )}
              />
            )}
            keyExtractor={({ id }) => id.toString()}
            ItemSeparatorComponent={ListSpacer}
            refreshing={refreshing}
            onRefresh={fetchData}
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
    width: '99%',
    alignSelf: 'center',
    height: 50,
    margin: 'auto',
    borderRadius: 100 / 3,
    marginBottom: 15,
    color: theme.light,
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    color: theme.white,
  },
});
