import {FC, memo, useState, useCallback, useEffect} from 'react';

import GameField from '../GameField/GameField';
import {NUMBER_OF_MINES, SIZE} from '../GameField/GameField.helpers';
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
  const [isGameLose, setIsGameLose] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);
  const [isMouseOnRetention, setIsMouseOnRetention] = useState(false);
  const [isEmojiOnRetention, setIsEmojiOnRetention] = useState(false);

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

  const handleGameLoseChange = useCallback((value: boolean) => {
    setIsGameLose(value);
  }, []);

  const handleGameWinChange = useCallback((value: boolean) => {
    setIsGameWin(value);
  }, []);

  const handleMouseStatusChange = useCallback((value: boolean) => {
    setIsMouseOnRetention(value);
  }, []);

  const handleEmojiChange = useCallback((value: boolean) => {
    setIsEmojiOnRetention(value);
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
    handleGameLoseChange(false);
    handleGameWinChange(false);
    clearInterval(intervalId);
    setStopWAtcher(0);
    setNumberOfMines(0);
    handleFieldChange(new Array(SIZE * SIZE).fill(0));
    handleMaskChange(newMask);
    handleDisableChange(false);
  }, [handleDisableChange, handleFieldChange, handleGameLoseChange, handleGameWinChange, handleMaskChange, intervalId]);

  useEffect(() => {
    let numberOfClosedCell = 0;

    mask.forEach(cell => {
      if (cell === FieldCell['closed']) {
        numberOfClosedCell++;
      }
    });

    if (numberOfClosedCell === NUMBER_OF_MINES) {
      handleDisableChange(true);
      clearInterval(intervalId);
      handleGameWinChange(true);
    }
  }, [handleDisableChange, handleGameWinChange, intervalId, mask]);

  return (
    <div className="game">
      <GameHeader
        numberOfMines={numberOfMines}
        intervalId={intervalId}
        stopWatcher={stopWatcher}
        resetGame={resetGame}
        isGameLose={isGameLose}
        isGameWin={isGameWin}
        isMouseOnRetention={isMouseOnRetention}
        isEmojiOnRetention={isEmojiOnRetention}
        handleEmojiChange={handleEmojiChange}
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
        handleGameLoseChange={handleGameLoseChange}
        handleMouseStatusChange={handleMouseStatusChange}
      />
    </div>
  );
});

export default Game;
