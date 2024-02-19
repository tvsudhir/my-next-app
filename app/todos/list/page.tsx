'use client';

import React from 'react';
import { useQuery, gql } from '@apollo/client';

import styles from './list.module.css';

type Todo = {
  todoId: string,
  name: string,
  text: string,
};

export default function TodoList() {
  const { loading, error, data = { listToDos: [] } } = useQuery(gql`
    query ListToDos {
      listToDos {
        todoId
        name
        text
      }
    }
  `);

  console.log('data', data);
  const todos = data.listToDos;

  function renderTodo({ todoId, name, text }: Todo) {
    return (
      <div key={todoId} className={styles.singleTodo}>
        <div>{name}</div>
        <div>{text}</div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>List of Items</div>
      {todos.map(renderTodo)}
    </div>
  );
}
