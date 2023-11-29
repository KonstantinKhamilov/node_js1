import React from 'react';
import Count from './Count';
import MyEvents from './MyEvents';

function Content() {
  const contentInfo = { title: 'Заголовок', describe: 'Описание' };

  return (
    <main>
      <h1>{contentInfo.title}</h1>
      <p>{contentInfo.describe}</p>
      <Count />
      <MyEvents />
    </main>
  );
}

export default Content;