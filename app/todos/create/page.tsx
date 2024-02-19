'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, gql } from '@apollo/client';

import styles from './createTodo.module.css';

type InputForm = {
  name: string
  text: string
};

export default function CreateToDo() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<InputForm>();

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

  const onSubmit = async (formData: InputForm) => {
    console.log('formData', formData);
    await createTodo({ variables: { todo: formData } });

    router.push('/todos/list');
  }

  console.log('formState', formState);
  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div>Name</div>
      <input {...register('name')} />
      <div>Text</div>
      <textarea {...register('text')} />
      <input className={styles.submitButton} type="submit" />
    </form>
  );
}