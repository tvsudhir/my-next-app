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

  const rows = [[], [], [], [], [], [], []];
  console.log('rows', rows);
  for (let i = 0; i < data.length; i++) {
    const { day } = data[i];
    rows[day].push(data[i]);
  }

  console.log('rows', rows);
  return (
    <table>
      {
        rows.map((row, i) => (
          <tr key={i}>
            {
              row.map((d) => (
                <td key={`${d.w}-${d.day}`} style={{ color: getColor(d.contribs) }}>{d.contribs}</td>
              ))
            }
          </tr>
        ))
      }
    </table>
  );
}
