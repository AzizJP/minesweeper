import {FC, memo} from 'react';

import Game from './Game/Game';

import './Main.scss';

const Main: FC = memo(() => {
  return (
    <main className="main">
      <Game />
    </main>
  );
});

export default Main;
