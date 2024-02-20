import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Link href="/todos">ToDos</Link>
    </div>
  );
}
