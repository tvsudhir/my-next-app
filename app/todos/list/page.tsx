'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';
import ToDo from '@/components/ToDo';
import LIST_TODOS from './listToDo.gql';

import styles from './list.module.css';

type ToDo = {
  todoId: string,
  name: string,
  text: string,
};

function TodoList() {
  const { loading, error, refetch, data = { listToDos: [] } } = useQuery(LIST_TODOS, {
    // If we Create a new ToDo then it won't be visible.
    // We either manually update the cache in createToDo (not eligant) Or fetch fresh list on render
    fetchPolicy: 'network-only'
  });

  console.log('data', data);
  const todos = data.listToDos;

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h4>List of ToDos</h4>
        <Link href="/todos/create">Create</Link>
      </div>
      {
        todos.map((todo: ToDo) => <ToDo
          key={todo.todoId}
          todoId={todo.todoId}
          name={todo.name}
          text={todo.text}
          refetch={refetch}
        />)
      }
    </div>
  );
}

export default TodoList;
