import {FC, memo, useCallback, MouseEvent, MouseEventHandler} from 'react';

import Sprite from '../../Sprite/Sprite';
import {SpriteTypes} from '../Main.types';

import {CELLS, SIZE} from './GameField.helpers';
import {GameFieldProps} from './GameField.props';
import {FieldCell} from './GameField.types';

import './GameField.scss';

const GameField: FC<GameFieldProps> = memo(
  ({
    field,
    mask,
    handleMaskChange,
    isDisabled,
    handleDisableChange,
    onStart,
    numberOfMines,
    handleNumberOfMinesChange,
    intervalId,
  }) => {
    const displayField = (x: number, y: number) => {
      if (mask[y * SIZE + x] !== FieldCell['transparent']) return FieldCell[mask[y * SIZE + x]].toLowerCase();
      return FieldCell[field[y * SIZE + x]].toLowerCase();
    };

    const handleCellClick = useCallback(
      (x: number, y: number): MouseEventHandler<HTMLButtonElement> => {
        const newMask = [...mask];
        const emptyCells: Array<[number, number]> = [];
        onStart();

        if (newMask[y * SIZE + x] === FieldCell['transparent']) return;

        if (field[y * SIZE + x] === FieldCell['mine-activated']) {
          handleDisableChange(true);
          clearInterval(intervalId);

          field.forEach((cell, idx) => {
            if (newMask[idx] === FieldCell['question']) {
              newMask[idx] = FieldCell['question-clicked'];
            }
            if (cell === FieldCell['mine-activated']) {
              if (newMask[idx] === FieldCell['flag']) {
                newMask[idx] = FieldCell['mine-cleared'];
              } else {
                newMask[idx] = FieldCell['mine'];
              }
            }
          });
        }

        const openEmptyCells = (cellByX: number, cellByY: number) => {
          if (cellByX >= 0 && cellByX < SIZE && cellByY >= 0 && cellByY < SIZE) {
            if (newMask[cellByY * SIZE + cellByX] === FieldCell['transparent']) return;
            emptyCells.push([cellByX, cellByY]);
          }
        };

        openEmptyCells(x, y);

        while (emptyCells.length) {
          const [a, b] = emptyCells.pop();

          newMask[b * SIZE + a] = FieldCell['transparent'];

          if (field[b * SIZE + a] !== 0) continue;

          openEmptyCells(a + 1, b);
          openEmptyCells(a - 1, b);
          openEmptyCells(a, b + 1);
          openEmptyCells(a, b - 1);
        }
        handleMaskChange(newMask);
      },
      [field, handleDisableChange, handleMaskChange, intervalId, mask, onStart],
    );

    const handleRightClick = useCallback(
      (evt: MouseEvent<HTMLButtonElement>, x: number, y: number): MouseEventHandler<HTMLButtonElement> => {
        evt.preventDefault();

        const newMask = [...mask];

        if (isDisabled) return;

        if (newMask[y * SIZE + x] === FieldCell['transparent']) return;

        if (newMask[y * SIZE + x] === FieldCell['closed']) {
          newMask[y * SIZE + x] = FieldCell['flag'];
          handleNumberOfMinesChange(numberOfMines - 1);
        } else if (newMask[y * SIZE + x] === FieldCell['flag']) {
          newMask[y * SIZE + x] = FieldCell['question'];
          handleNumberOfMinesChange(numberOfMines + 1);
        } else if (newMask[y * SIZE + x] === FieldCell['question']) {
          newMask[y * SIZE + x] = FieldCell['closed'];
        }

        handleMaskChange(newMask);
      },
      [handleMaskChange, handleNumberOfMinesChange, isDisabled, mask, numberOfMines],
    );

    return (
      <div className="game__field">
        {CELLS.map((a, y) => {
          return (
            <div className="game__field_column" key={y}>
              {CELLS.map((b, x) => {
                return (
                  <Sprite
                    key={x}
                    type={SpriteTypes.FIELD_CELL}
                    item={displayField(x, y)}
                    handleClick={() => handleCellClick(x, y)}
                    handleRightClick={evt => handleRightClick(evt, x, y)}
                    isDisabled={isDisabled}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
);

export default GameField;
