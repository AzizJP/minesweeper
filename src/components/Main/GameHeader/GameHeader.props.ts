import {MouseEventHandler} from 'react';

export interface GameHeaderProps {
  numberOfMines: number;
  intervalId: NodeJS.Timer;
  stopWatcher: number;
  resetGame: MouseEventHandler<HTMLButtonElement>;
}
