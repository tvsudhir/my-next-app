import React, { useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import { useMutation } from '@apollo/client';

import styles from './todo.module.css';
import DELETE_TODO from './deleteToDo.gql';

type Todo = {
  todoId: string,
  name: string,
  text: string,
  refetch: Function,
};

function ToDo({ todoId, name, text, refetch }: Todo) {
  const [canDelete, setCanDelete] = useState(false);
  const [deleteTodo, { data: deleteStatus, loading, error }] = useMutation(DELETE_TODO);

  const onDelClick = () => {
    setCanDelete(true);
  }

  const onModalClose = () => {
    setCanDelete(false);
  }

  const proceedWithDelete = async () => {
    await deleteTodo({ variables: { todoId }});
    await refetch();
    onModalClose();
  }

  console.log('canDelete', canDelete, todoId, name);
  Modal.setAppElement('body');

  return (
    <div className={styles.singleTodo}>
      <Link href={`/todos/update/${todoId}`}>{name}</Link>
      <div>{text}</div>
      <button className={styles.delButton} onClick={onDelClick}>DEL</button>
      <Modal
        isOpen={canDelete}
        onRequestClose={onModalClose}
      >
        <div className={styles.modalMain}>
          <div className={styles.modalTitle}>Do you want to Delete ToDo "{name}" (id={todoId}) ?</div>
          <button onClick={proceedWithDelete}>Yes</button>
          <button onClick={onModalClose}>No</button>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(ToDo);
