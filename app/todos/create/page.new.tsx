'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, gql } from '@apollo/client';

export default function CreateTodo() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const router = useRouter();
  const [createTodo, { data: createdTodo, loading, error }] = useMutation(gql`
    mutation test_createToDo($todo: ToDoCreateInput) {
      createToDo(todo: $todo) {
        todoId
        name
        text
      }
    }
  `);

  async function submitData() {
    console.log('name, text', name, text);
    console.log('submit data');
    const id = Date.now();
    const formData = {
      name,
      text,
    };

    console.log('formData', formData);
    await createTodo({ variables: { todo: formData } });

    router.push('/todos/list');
  }

  console.log('createdTodo', createdTodo)
  console.log('loading', loading)
  console.log('error', error)

  return (
    <div>
      Create TODO:
      <div>
        <input
          type="text"
          name="name"
          id="id:name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />

        <input
          type="text"
          name="text"
          id="id:text"
          value={text}
          onChange={(event) => {
            setText(event.target.value)
          }}
        />

        <button onClick={submitData} type="submit">Click</button>
      </div>
    </div>
  );
}
