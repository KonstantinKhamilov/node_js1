// MyEvents.js
import React from 'react';

function MyEvents() {
  return (
    <div>
      <button onClick={() => alert('Клик!')}>Нажми на меня</button>
      <button onMouseDown={() => alert('Мышь нажата!')} onMouseUp={() => alert('Мышь отпущена!')}>Нажми и удерживай меня</button>
      <p onMouseMove={() => console.log('Мышь двигается!')}>Перемести мышь по этому тексту</p>
      <input onCut={() => alert('Текст вырезан!')} onCopy={() => alert('Текст скопирован!')} defaultValue="Вырежи или скопируй меня" />
      <div onWheel={() => console.log('Колесо мыши прокручено!')}>Прокрути колесо мыши на этом блоке</div>
    </div>
  );
}

export default MyEvents;
