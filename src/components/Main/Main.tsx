import {FC, memo} from 'react';

import Sprite from '../Sprite/Sprite';

import './Main.scss';

const Main: FC = memo(() => {
  return (
    <main className="main">
      <div className="game">
        <div className="game__header">
          <div className="game__mines">
            <Sprite isButton={false} item="one" />
            <Sprite isButton={false} item="one" />
            <Sprite isButton={false} item="one" />
          </div>
          <div className="game__emoji">
            <Sprite isButton={false} item="one" />
          </div>
          <div className="game__stopwatch">
            <Sprite isButton={false} item="one" />
            <Sprite isButton={false} item="one" />
            <Sprite isButton={false} item="one" />
          </div>
        </div>
      </div>
    </main>
  );
});

export default Main;
