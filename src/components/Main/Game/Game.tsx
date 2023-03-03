import {FC, memo, useState, useCallback} from 'react';

import GameField from '../GameField/GameField';
import {SIZE} from '../GameField/GameField.helpers';
import {FieldCell} from '../GameField/GameField.types';
import GameHeader from '../GameHeader/GameHeader';

import './Game.scss';

const Game: FC = memo(() => {
  const [stopWatcher, setStopWAtcher] = useState(0);
  const [numberOfMines, setNumberOfMines] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [field, setField] = useState<Array<number>>(() => new Array(SIZE * SIZE).fill(0));
  const [mask, setMask] = useState<Array<number>>(() => new Array(SIZE * SIZE).fill(FieldCell['closed']));
  const [isDisabled, setIsDisabled] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);

  const handleFieldChange = useCallback((newField: Array<number>) => {
    setField(newField);
  }, []);

  const handleMaskChange = useCallback((newMask: Array<number>) => {
    setMask(newMask);
  }, []);

  const handleDisableChange = useCallback((isDis: boolean) => {
    setIsDisabled(isDis);
  }, []);

  const handleNumberOfMinesChange = useCallback((newNumber: number) => {
    setNumberOfMines(newNumber);
  }, []);

  let seconds = stopWatcher;
  const activateStopWatcher = useCallback(() => {
    seconds++;
    setStopWAtcher(seconds);
  }, [seconds]);

  const onStart = useCallback(() => {
    if (stopWatcher !== 0) return;
    setIsGameStart(true);
    activateStopWatcher();
    const id = setInterval(activateStopWatcher, 1000);
    setIntervalId(id);
  }, [activateStopWatcher, stopWatcher]);

  const resetGame = useCallback(() => {
    const newMask = new Array(SIZE * SIZE).fill(FieldCell['closed']);

    setIsGameStart(false);
    clearInterval(intervalId);
    setStopWAtcher(0);
    setNumberOfMines(0);
    handleFieldChange(new Array(SIZE * SIZE).fill(0));
    handleMaskChange(newMask);
    handleDisableChange(false);
  }, [handleDisableChange, handleFieldChange, handleMaskChange, intervalId]);

  return (
    <div className="game">
      <GameHeader
        numberOfMines={numberOfMines}
        intervalId={intervalId}
        stopWatcher={stopWatcher}
        resetGame={resetGame}
      />
      <GameField
        field={field}
        handleFieldChange={handleFieldChange}
        mask={mask}
        handleMaskChange={handleMaskChange}
        isDisabled={isDisabled}
        handleDisableChange={handleDisableChange}
        onStart={onStart}
        numberOfMines={numberOfMines}
        handleNumberOfMinesChange={handleNumberOfMinesChange}
        intervalId={intervalId}
        isGameStart={isGameStart}
      />
    </div>
  );
});

export default Game;
