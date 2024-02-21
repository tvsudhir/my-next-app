'use client'

import React, { useState, useEffect } from 'react';

function generateData() {
  // day 0 - 6
  // week 0 - 51
  // year - 
  const data = [];
  for (let w = 0; w < 51; w++) {
    for (let d = 0; d < 7; d++) {
      const contribs = Math.trunc(Math.random() * 20);
      const val = { day: d, w: w, contribs };
      data.push(val);
    }
  }
  
  for (let i = 0; i <= new Date().getDay(); i++) {
    const contribs = Math.trunc(Math.random() * 20);
    data.push({ day: i, w: 51, contribs });
  }
  
  return data;
}

function getColor(contribs) {
  if (contribs < 5) {
    return 'grey';
  }

  if (contribs < 10) {
    return 'blue';
  }

  if (contribs < 15) {
    return 'green';
  }

  if (contribs < 20) {
    return 'red';
  }
}

function renderCol(arr) {
  return (arr.map((val) => (<span style={{color: getColor(val.contribs)}}>{val.w}-{val.day}-{val.contribs}||</span>)));
}

export default function GitContribs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(generateData());
  }, []);

  console.log('data', data);
  let allData = [];
  let rCols = [];
  for (let i = 0; i < data.length; i++) {
    const val = data[i];
    const { day } = val;
    rCols.push(val)

    if (day === 6) {
      rCols = renderCol(rCols);
      allData.push(rCols);
      rCols = [];
    }
  }

  allData.push(renderCol(rCols));

  return (
    <div>{
      allData.map((weekData) => (
        <div>{weekData}</div>
      ))
    }</div>
  );
}
