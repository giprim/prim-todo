import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_TODO = 'STORE_TODO';

export const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const localData = await AsyncStorage.getItem(STORE_TODO);
      if (localData !== null) {
        // console.log(JSON.parse(localData));
        return setTodos(JSON.parse(localData));
      }
    } catch (e) {
      console.error({ e });
    }
  };

  const handleDelete = (message) => {
    const newTodos = todos.filter((value) => value.id !== message.id);
    setTodos(newTodos);
    storeData(newTodos);
  };

  const handleChecked = async (item, checkBoxValue) => {
    let data = todos.filter((initialTodo) => initialTodo.id === item.id)[0];
    let array = todos.filter((initialTodo) => initialTodo.id !== item.id);
    data = { ...data, done: checkBoxValue };
    if (data.done) array.push(data);
    else array.unshift(data);

    setTodos(() => {
      storeData(array);
      //   console.log(array);
      return array;
    });
  };

  const handleSubmit = () => {
    if (text) {
      setTodos((prev) => {
        let data = [
          {
            id: uuid(),
            todo: text,
            done: false,
            important: false,
          },
          ...prev,
        ];
        storeData(data);
        return data;
      });
    }
    setText('');
  };

  const storeData = async (todos) => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem(STORE_TODO, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    todos,
    setTodos,
    handleDelete,
    refreshing,
    fetchData,
    setText,
    text,
    handleSubmit,
    handleChecked,
  };
};
