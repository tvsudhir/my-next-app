'use client';

import React, { useEffect, useState } from 'react';

type Todo = {
  id: string,
  name: string,
  text: string,
};

export default function TodoList() {
  const [todos, setTodos] = useState([] as Todo[]);

  useEffect(() => {
    async function fetchTodos() {
      const result: Todo[] = await new Promise((res) => {
        setTimeout(() => res([
          { id: 't1', name: 'todo1', text: 'Finish react course today' },
          { id: 't2', name: 'todo2', text: 'Check on Nodejs' },
        ]), 1000);
      });

      setTodos(result);
    }

    fetchTodos();
  }, []); // loaded only once

  function renderTodo({ id, name, text }: Todo) {
    return (
      <div key={id}>
        <div>{name}</div>
        <div>{text}</div>
      </div>
    );
  }

  return (
    <div>
      List of Items
      {todos.map((todo) => renderTodo(todo))}
    </div>
  );
}
