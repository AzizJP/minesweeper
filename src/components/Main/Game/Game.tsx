import {FC, memo, useState, useCallback, useEffect} from 'react';

import GameField from '../GameField/GameField';
import {NUMBER_OF_MINES, SIZE} from '../GameField/GameField.helpers';
import {GameFieldProps} from '../GameField/GameField.props';
import {FieldCell} from '../GameField/GameField.types';
import GameHeader from '../GameHeader/GameHeader';

import './Game.scss';

const Game: FC = memo(() => {
  const [stopWatcher, setStopWatcher] = useState(0);
  const [numberOfMines, setNumberOfMines] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [field, setField] = useState<Array<number>>(new Array(SIZE * SIZE).fill(0));
  const [mask, setMask] = useState<Array<number>>(new Array(SIZE * SIZE).fill(FieldCell['closed']));
  const [isDisabled, setIsDisabled] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
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

  const handleNumberOfMinesChange = useCallback<GameFieldProps['handleNumberOfMinesChange']>(newNumber => {
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

  const startStopWatch = useCallback(() => {
    setIsGameStarted(true);
    const id = setInterval(() => setStopWatcher(prev => prev + 1), 1000);
    setIntervalId(id);
  }, []);

  const resetGame = useCallback(() => {
    const newMask = new Array(SIZE * SIZE).fill(FieldCell['closed']);

    setIsGameStarted(false);
    handleGameLoseChange(false);
    handleGameWinChange(false);
    clearInterval(intervalId);
    setStopWatcher(0);
    setNumberOfMines(0);
    handleFieldChange(new Array(SIZE * SIZE).fill(0));
    handleMaskChange(newMask);
    handleDisableChange(false);
  }, [handleDisableChange, handleFieldChange, handleGameLoseChange, handleGameWinChange, handleMaskChange, intervalId]);

  useEffect(() => {
    let numberOfClosedCell = 0;

    mask.forEach(cell => {
      if (cell !== FieldCell['opened']) {
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
        startStopWatch={startStopWatch}
        numberOfMines={numberOfMines}
        handleNumberOfMinesChange={handleNumberOfMinesChange}
        intervalId={intervalId}
        isGameStarted={isGameStarted}
        handleGameLoseChange={handleGameLoseChange}
        handleMouseStatusChange={handleMouseStatusChange}
      />
    </div>
  );
});

export default Game;
