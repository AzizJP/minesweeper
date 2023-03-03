export interface GameFieldProps {
  field: Array<number>;
  handleFieldChange(newField: Array<number>): void;
  mask: Array<number>;
  handleMaskChange(newMask: Array<number>): void;
  isDisabled: boolean;
  handleDisableChange(isDis: boolean): void;
  onStart(): void;
  numberOfMines: number;
  handleNumberOfMinesChange(newNumber: number): void;
  intervalId: NodeJS.Timer;
  isGameStart: boolean;
}
