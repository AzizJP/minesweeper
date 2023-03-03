export interface GameHeaderProps {
  numberOfMines: number;
  intervalId: NodeJS.Timer;
  stopWatcher: number;
  resetGame(): void;
}
