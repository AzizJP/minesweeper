export interface GameHeaderProps {
  numberOfMines: number;
  intervalId: NodeJS.Timer;
  stopWatcher: number;
  resetGame(): void;
  isGameLose: boolean;
  isGameWin: boolean;
  isMouseOnRetention: boolean;
  isEmojiOnRetention: boolean;
  handleEmojiChange(value: boolean): void;
}
