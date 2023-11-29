import AllData from './AllData';
import PersonProp from './PersonProp';
import PersonChild from './PersonChild';

import logo from './Caracl.jpg';
import './App.css';

function App() {
  const obj = { member1: 'num1', member2: 'member 2' };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {obj.member1}
          {obj.member2}
        </div>
        <PersonProp character="Информация о персонаже" />
        <PersonChild>Длина тела каракала 65—82 см, хвоста — 25—30 см, высота в холке около 45 см; масса 11—20 кг.
                 Уши с кисточками (до 5 см) на концах. На лапах развита щётка из жёстких волос, облегчающая передвижение по песку.
                Мех короткий и густой. Окраской напоминает североамериканскую пуму (Puma concolor):
                 песчаный или красновато-коричневый верх, беловатый низ; по бокам морды чёрные отметины.
                  Кисточки и наружная сторона ушей — чёрные. Очень редко встречаются чёрные каракалы-меланисты.</PersonChild>
        <AllData props="Пропсы">Чилдрены</AllData>
      </header>
    </div>
  );
}

export default App;
