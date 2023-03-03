import {FC, memo, useCallback, MouseEvent, MouseEventHandler} from 'react';

import Sprite from '../../Sprite/Sprite';
import {createField} from '../Game/Game.helpers';
import {SpriteTypes} from '../Main.types';

import {CELLS, NUMBER_OF_MINES, SIZE} from './GameField.helpers';
import {GameFieldProps} from './GameField.props';
import {FieldCell} from './GameField.types';

import './GameField.scss';

const GameField: FC<GameFieldProps> = memo(
  ({
    field,
    handleFieldChange,
    mask,
    handleMaskChange,
    isDisabled,
    handleDisableChange,
    onStart,
    numberOfMines,
    handleNumberOfMinesChange,
    intervalId,
    isGameStart,
  }) => {
    const displayField = (x: number, y: number) => {
      if (mask[y * SIZE + x] !== FieldCell['opened']) return FieldCell[mask[y * SIZE + x]].toLowerCase();
      return FieldCell[field[y * SIZE + x]].toLowerCase();
    };

    const handleCellClick = useCallback(
      (x: number, y: number): MouseEventHandler<HTMLButtonElement> => {
        const newMask = [...mask];

        if (newMask[y * SIZE + x] === FieldCell['opened']) return;

        const emptyCells: Array<[number, number]> = [];

        const newField = isGameStart ? [...field] : createField(SIZE, NUMBER_OF_MINES, x, y);

        onStart();

        if (!isGameStart) {
          let mines = numberOfMines;

          newField.forEach(cell => {
            if (cell === FieldCell['mine-activated']) {
              mines++;
              handleNumberOfMinesChange(mines);
            }
          });
        }

        if (newField[y * SIZE + x] === FieldCell['mine-activated']) {
          handleDisableChange(true);
          clearInterval(intervalId);
          let mines = 0;

          newField.forEach((cell, idx) => {
            if (newMask[idx] === FieldCell['question']) {
              newMask[idx] = FieldCell['question-clicked'];
            }

            if (cell === FieldCell['mine-activated']) {
              if (newMask[idx] === FieldCell['flag']) {
                newMask[idx] = FieldCell['mine-cleared'];
              } else {
                newMask[idx] = FieldCell['mine'];
                mines++;
                handleNumberOfMinesChange(mines);
              }
            }
          });
        }

        const addClickedCell = (cellByX: number, cellByY: number) => {
          if (cellByX >= 0 && cellByX < SIZE && cellByY >= 0 && cellByY < SIZE) {
            if (newMask[cellByY * SIZE + cellByX] === FieldCell['opened']) return;
            emptyCells.push([cellByX, cellByY]);
          }
        };

        addClickedCell(x, y);

        while (emptyCells.length) {
          const [a, b] = emptyCells.pop();

          newMask[b * SIZE + a] = FieldCell['opened'];

          if (newField[b * SIZE + a] !== 0) continue;

          addClickedCell(a + 1, b);
          addClickedCell(a - 1, b);
          addClickedCell(a, b + 1);
          addClickedCell(a, b - 1);
        }

        handleMaskChange(newMask);
        handleFieldChange(newField);
        return;
      },
      [
        field,
        handleDisableChange,
        handleFieldChange,
        handleMaskChange,
        handleNumberOfMinesChange,
        intervalId,
        isGameStart,
        mask,
        numberOfMines,
        onStart,
      ],
    );

    const handleRightClick = useCallback(
      (evt: MouseEvent<HTMLButtonElement>, x: number, y: number): MouseEventHandler<HTMLButtonElement> => {
        evt.preventDefault();

        if (!isGameStart) return;

        const newMask = [...mask];

        if (isDisabled) return;

        if (newMask[y * SIZE + x] === FieldCell['opened']) return;

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
      [handleMaskChange, handleNumberOfMinesChange, isDisabled, isGameStart, mask, numberOfMines],
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
