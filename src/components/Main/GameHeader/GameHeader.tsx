import {FC, memo, useCallback, useEffect, useState, useMemo} from 'react';

import Cell from '../Cell/Cell';

import {GameHeaderProps} from './GameHeader.props';

import './GameHeader.scss';
import {Emoji, MineDisplay, Numbers, CellTypes, TimeDisplay} from './GameHeader.types';

const GameHeader: FC<GameHeaderProps> = memo(
  ({
    numberOfMines,
    intervalId,
    stopWatcher,
    resetGame,
    isGameLose,
    isGameWin,
    isMouseOnRetention,
    isEmojiOnRetention,
    handleEmojiChange,
  }) => {
    const [time, setTime] = useState<TimeDisplay>({
      firstDisplay: 0,
      secondDisplay: 0,
      thirdDisplay: 0,
    });
    const [mines, setMines] = useState<MineDisplay>({
      firstDisplay: 0,
      secondDisplay: 0,
      thirdDisplay: 0,
    });

    const changeTimeUpToTenSec = useCallback((value: number) => setTime(prev => ({...prev, firstDisplay: value})), []);

    const changeMinesDisplayToTenPieces = useCallback(
      (value: number) => setMines(prev => ({...prev, firstDisplay: value})),
      [],
    );

    const changeTimeUpToHundredSec = useCallback(
      (value: number) =>
        setTime(prev => ({...prev, firstDisplay: +value.toString()[1], secondDisplay: +value.toString()[0]})),
      [],
    );

    const changeMinesDisplayToHundredPieces = useCallback(
      (value: number) =>
        setMines(prev => ({...prev, firstDisplay: +value.toString()[1], secondDisplay: +value.toString()[0]})),
      [],
    );

    const changeTimeUpToThousandSec = useCallback(
      (value: number) =>
        setTime({
          firstDisplay: +value.toString()[2],
          secondDisplay: +value.toString()[1],
          thirdDisplay: +value.toString()[0],
        }),
      [],
    );

    const changeTimeUpToMax = useCallback(
      (value: number) => setTime({firstDisplay: value, secondDisplay: value, thirdDisplay: value}),
      [],
    );

    const onEmojiRetention = useCallback(() => {
      handleEmojiChange(true);
    }, [handleEmojiChange]);

    const onEmojiRelease = useCallback(() => {
      handleEmojiChange(false);
    }, [handleEmojiChange]);

    const onEmojiClick = useCallback(() => {
      resetGame();
      setTime({
        firstDisplay: 0,
        secondDisplay: 0,
        thirdDisplay: 0,
      });
      setMines({
        firstDisplay: 0,
        secondDisplay: 0,
        thirdDisplay: 0,
      });
    }, [resetGame]);

    const handleEmojiStatus = useMemo(() => {
      if (isGameLose) return Emoji.DEATH;
      if (isGameWin) return Emoji.SUNGLASSES;
      if (isMouseOnRetention) return Emoji.OPEN_MOUTH;
      if (isEmojiOnRetention) return Emoji.SMILE_CLICKED;
      return Emoji.SMILE;
    }, [isGameLose, isGameWin, isMouseOnRetention, isEmojiOnRetention]);

    useEffect(() => {
      if (numberOfMines < 10) {
        changeMinesDisplayToTenPieces(numberOfMines);
      } else if (numberOfMines >= 10 && numberOfMines < 100) {
        changeMinesDisplayToHundredPieces(numberOfMines);
      }

      if (stopWatcher < 10) {
        changeTimeUpToTenSec(stopWatcher);
      } else if (stopWatcher >= 10 && stopWatcher < 100) {
        changeTimeUpToHundredSec(stopWatcher);
      } else if (stopWatcher >= 100 && stopWatcher < 1000) {
        changeTimeUpToThousandSec(stopWatcher);
      } else {
        clearInterval(intervalId);
        changeTimeUpToMax(9);
      }
    }, [
      changeMinesDisplayToHundredPieces,
      changeMinesDisplayToTenPieces,
      changeTimeUpToHundredSec,
      changeTimeUpToMax,
      changeTimeUpToTenSec,
      changeTimeUpToThousandSec,
      intervalId,
      numberOfMines,
      stopWatcher,
    ]);

    return (
      <div className="game__header">
        <div className="game__numbers">
          <Cell type={CellTypes.NUMBER} item={Numbers[mines.thirdDisplay].toLowerCase()} />
          <Cell type={CellTypes.NUMBER} item={Numbers[mines.secondDisplay].toLowerCase()} />
          <Cell type={CellTypes.NUMBER} item={Numbers[mines.firstDisplay].toLowerCase()} />
        </div>
        <div className="game__emoji">
          <Cell
            type={CellTypes.EMOJI}
            item={handleEmojiStatus}
            handleClick={onEmojiClick}
            handleRetention={onEmojiRetention}
            handleRelease={onEmojiRelease}
            handleOut={onEmojiRelease}
          />
        </div>
        <div className="game__numbers">
          <Cell type={CellTypes.NUMBER} item={Numbers[time.thirdDisplay].toLowerCase()} />
          <Cell type={CellTypes.NUMBER} item={Numbers[time.secondDisplay].toLowerCase()} />
          <Cell type={CellTypes.NUMBER} item={Numbers[time.firstDisplay].toLowerCase()} />
        </div>
      </div>
    );
  },
);

export default GameHeader;
