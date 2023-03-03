import {FC, memo, useCallback, useEffect, useState, useMemo} from 'react';

import Sprite from '../../Sprite/Sprite';
import {ITime, Numbers, SpriteTypes} from '../Main.types';

import {GameHeaderProps} from './GameHeader.props';

import './GameHeader.scss';
import {Emoji} from './GameHeader.types';

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
    const [time, setTime] = useState<ITime>({
      firsDisplay: 0,
      secondDisplay: 0,
      thirdDisplay: 0,
    });
    const [mines, setMines] = useState<ITime>({
      firsDisplay: 0,
      secondDisplay: 0,
      thirdDisplay: 0,
    });

    const changeTimeUpToTenSec = useCallback((value: number, obj: ITime) => {
      return setTime({...obj, firsDisplay: value});
    }, []);

    const changeMinesDisplayToTenPieces = useCallback((value: number, obj: ITime) => {
      return setMines({...obj, firsDisplay: value});
    }, []);

    const changeTimeUpToHundredSec = useCallback((value: number, obj: ITime) => {
      return setTime({...obj, firsDisplay: +value.toString()[1], secondDisplay: +value.toString()[0]});
    }, []);

    const changeMinesDisplayToHundredPieces = useCallback((value: number, obj: ITime) => {
      return setMines({...obj, firsDisplay: +value.toString()[1], secondDisplay: +value.toString()[0]});
    }, []);

    const changeTimeUpToThousandSec = useCallback((value: number, obj: ITime) => {
      return setTime({
        ...obj,
        firsDisplay: +value.toString()[2],
        secondDisplay: +value.toString()[1],
        thirdDisplay: +value.toString()[0],
      });
    }, []);

    const changeTimeUpToMax = useCallback((value: number, obj: ITime) => {
      return setTime({
        ...obj,
        firsDisplay: value,
        secondDisplay: value,
        thirdDisplay: value,
      });
    }, []);

    const onEmojiRetention = useCallback(() => {
      handleEmojiChange(true);
    }, [handleEmojiChange]);

    const onEmojiRelease = useCallback(() => {
      handleEmojiChange(false);
    }, [handleEmojiChange]);

    const onEmojiClick = useCallback(() => {
      resetGame();
      setTime({
        ...time,
        firsDisplay: 0,
        secondDisplay: 0,
        thirdDisplay: 0,
      });
      setMines({
        ...mines,
        firsDisplay: 0,
        secondDisplay: 0,
        thirdDisplay: 0,
      });
    }, [mines, resetGame, time]);

    const handleEmojiStatus = useMemo(() => {
      if (isGameLose) return Emoji.DEATH;
      if (isGameWin) return Emoji.SUNGLASSES;
      if (isMouseOnRetention) return Emoji.OPEN_MOUTH;
      if (isEmojiOnRetention) return Emoji.SMILE_CLICKED;
      return Emoji.SMILE;
    }, [isGameLose, isGameWin, isMouseOnRetention, isEmojiOnRetention]);

    useEffect(() => {
      if (numberOfMines < 10) {
        changeMinesDisplayToTenPieces(numberOfMines, mines);
      } else if (numberOfMines >= 10 && numberOfMines < 100) {
        changeMinesDisplayToHundredPieces(numberOfMines, mines);
      }

      if (stopWatcher < 10) {
        changeTimeUpToTenSec(stopWatcher, time);
      } else if (stopWatcher >= 10 && stopWatcher < 100) {
        changeTimeUpToHundredSec(stopWatcher, time);
      } else if (stopWatcher >= 100 && stopWatcher < 1000) {
        changeTimeUpToThousandSec(stopWatcher, time);
      } else {
        clearInterval(intervalId);
        changeTimeUpToMax(9, time);
      }
    }, [
      changeMinesDisplayToHundredPieces,
      changeMinesDisplayToTenPieces,
      changeTimeUpToHundredSec,
      changeTimeUpToMax,
      changeTimeUpToTenSec,
      changeTimeUpToThousandSec,
      numberOfMines,
      stopWatcher,
    ]);

    return (
      <div className="game__header">
        <div className="game__numbers">
          <Sprite type={SpriteTypes.NUMBER} item={Numbers[mines.thirdDisplay].toLowerCase()} />
          <Sprite type={SpriteTypes.NUMBER} item={Numbers[mines.secondDisplay].toLowerCase()} />
          <Sprite type={SpriteTypes.NUMBER} item={Numbers[mines.firsDisplay].toLowerCase()} />
        </div>
        <div className="game__emoji">
          <Sprite
            type={SpriteTypes.EMOJI}
            item={handleEmojiStatus}
            handleClick={onEmojiClick}
            handleRetention={onEmojiRetention}
            handleRelease={onEmojiRelease}
            handleOut={onEmojiRelease}
          />
        </div>
        <div className="game__numbers">
          <Sprite type={SpriteTypes.NUMBER} item={Numbers[time.thirdDisplay].toLowerCase()} />
          <Sprite type={SpriteTypes.NUMBER} item={Numbers[time.secondDisplay].toLowerCase()} />
          <Sprite type={SpriteTypes.NUMBER} item={Numbers[time.firsDisplay].toLowerCase()} />
        </div>
      </div>
    );
  },
);

export default GameHeader;
