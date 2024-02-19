'use server'

import React from 'react';
// import TestComp from './TestComp';
import GitContribs from './GitContribs';

async function getData(): Promise<{ data: string }> {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: 'something',
      });
    }, 1000);
  });
}

export default async function Feature() {
  const { data } = await getData();
  return (
    <div>
      <div className="my-class">Testing the feature - {data}</div>
      <GitContribs some={data} />
    </div>
  );
}
