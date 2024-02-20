'use client';

import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import styles from './updateTodo.module.css';

type PageParams = {
  params: {
    todoId: string
  }
};

type InputForm = {
  name: string
  text: string
};

const GET_TODO = gql`
  query GetToDo($todoId: ID!) {
    getToDo(todoId: $todoId) {
      todoId
      name
      text 
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($todo: ToDoUpdateInput) {
    updateToDo (todo: $todo) {
      todoId
      name
      text    
    }
  }
`;

export default function updateTodo({ params }: PageParams) {
  const { todoId } = params;
  const router = useRouter();
  const { data = { getTodo: {} } } = useQuery(GET_TODO, {
    variables: { todoId },
    // Properly normalized so we do not need it
    // fetchPolicy: 'network-only'
  });

  const receivedTodo = data.getToDo ?? {};
  console.log('receivedTodo', receivedTodo);

  const [updateTodo, { data: updatedTodo, loading, error }] = useMutation(UPDATE_TODO);

  const onSubmit = async (formData: InputForm) => {
    console.log('formData', formData, todoId);
    const updateTodoInput = { ...formData, todoId };
    
    await updateTodo({ variables: { todo: updateTodoInput } });

    router.push('/todos/list');
  }

  const {
    register,
    handleSubmit,
    formState
  } = useForm({
    defaultValues: {
      name: '',
      text: '',
    },
    values: {
      name: receivedTodo.name,
      text: receivedTodo.text,
    }
  });

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>Update ToDo {todoId}</div>
      <div>Name</div>
      <input {...register('name')} />
      <div>Text</div>
      <textarea {...register('text')} />
      <input className={styles.submitButton} type="submit" />
    </form>
  );
}
