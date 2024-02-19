import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  return (
    <div>
      This is the home Page
      <div>
        <Link href="/feature">Feature</Link>
        <br/>
        <Link href="/todos/create">Create TODO</Link>
      </div>
    </div>
  );
}
