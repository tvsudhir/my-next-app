import Link from 'next/link';
import TodoList from './todos/list/page';
import React from 'react';

export default function Home() {
  return (
    <div>
      <TodoList />
    </div>
  );
}
