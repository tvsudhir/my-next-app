'use client';

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import SomethingIsWrong from '@/components/SomethingIsWrong';
import GET_TODO from './getToDo.gql';
import UPDATE_TODO from './updateToDo.gql';

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

export default function updateTodo({ params }: PageParams) {
  const { todoId } = params;
  const router = useRouter();
  const { error: getToDoError, data = { getTodo: {} } } = useQuery(GET_TODO, {
    variables: { todoId },
    // Properly normalized so we do not need it
    // fetchPolicy: 'network-only'
  });

  const receivedTodo = data.getToDo ?? {};
  console.log('receivedTodo', receivedTodo);

  const [updateTodo, { error: updateToDoError, data: updatedTodo }] = useMutation(UPDATE_TODO);

  const onSubmit = async (formData: InputForm) => {
    console.log('formData', formData, todoId);
    const updateTodoInput = { ...formData, todoId };
    
    try {
      await updateTodo({ variables: { todo: updateTodoInput } });
      router.push('/todos/list');
    } catch (err) {
      console.log('*** ERROR - Fire Sentry Error', err);
    }
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

  if (getToDoError) {
    console.log('*** ERROR - Fire Sentry Error - getToDoError', getToDoError);
    return (
      <div>
        <div>Could not fetch ToDo = {todoId}</div>
        <SomethingIsWrong />
      </div>
    );
  }

  if (updateToDoError) {
    console.log('*** ERROR - Fire Sentry Error - updateToDoError', updateToDoError);
    return (
      <div>
        <div>Could not Update ToDo = {todoId}</div>
        <SomethingIsWrong />
      </div>
    );
  }

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
