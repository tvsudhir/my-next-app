'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import styles from './list.module.css';

type Todo = {
  todoId: string,
  name: string,
  text: string,
};

const LIST_TODOS = gql`
  query ListToDos {
    listToDos {
      todoId
      name
      text
    }
  }
`;

export default function TodoList() {
  const { loading, error, data = { listToDos: [] } } = useQuery(LIST_TODOS, {
    // Properly normalized so we do not need it
    // fetchPolicy: 'network-only'
  });

  console.log('data', data);
  const todos = data.listToDos;

  function renderTodo({ todoId, name, text }: Todo) {
    return (
      <div key={todoId} className={styles.singleTodo}>
        <Link href={`/todos/update/${todoId}`}>{name}</Link>
        <div>{text}</div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h4>List of ToDos</h4>
        <Link href="/todos/create">Create</Link>
      </div>
      {todos.map(renderTodo)}
    </div>
  );
}
