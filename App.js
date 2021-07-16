import 'react-native-get-random-values';
import React from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import AppLayout from './src/components/AppLayout';
import TodoItem from './src/components/TodoItem';
import ListSpacer from './src/components/ListSpacer';
import theme from './src/config/theme';
import Heading from './src/components/Heading';
import ListItemDeleteAction from './src/components/ListItemDeleteAction';
import { useTodo } from './src/hooks/useTodo';

export default function App() {
  const {
    todos,
    setTodos,
    handleDelete,
    refreshing,
    fetchData,
    setText,
    text,
    handleSubmit,
    handleChecked,
  } = useTodo();

  return (
    <AppLayout>
      <View style={styles.container}>
        <View>
          <Heading title='Tasks' />
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                todosArray={todos}
                handleChecked={handleChecked}
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
