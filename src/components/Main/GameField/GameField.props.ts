import {SetStateAction} from 'react';

export interface GameFieldProps {
  field: Array<number>;
  handleFieldChange(newField: Array<number>): void;
  mask: Array<number>;
  handleMaskChange(newMask: Array<number>): void;
  isDisabled: boolean;
  handleDisableChange(isDis: boolean): void;
  startStopWatch(): void;
  numberOfMines: number;
  handleNumberOfMinesChange(newNumber: SetStateAction<number>): void;
  intervalId: NodeJS.Timer;
  isGameStarted: boolean;
  handleGameLoseChange(value: boolean): void;
  handleMouseStatusChange(value: boolean): void;
}
