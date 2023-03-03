import {FC, memo, useCallback, MouseEvent, MouseEventHandler} from 'react';

import Cell from '../Cell/Cell';
import {createField} from '../Game/Game.helpers';
import {CellTypes} from '../GameHeader/GameHeader.types';

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
    startStopWatch,
    numberOfMines,
    handleNumberOfMinesChange,
    intervalId,
    isGameStarted,
    handleGameLoseChange,
    handleMouseStatusChange,
  }) => {
    const displayField = (x: number, y: number) => {
      const cellPosition = y * SIZE + x;
      if (mask[cellPosition] !== FieldCell['opened']) return FieldCell[mask[cellPosition]].toLowerCase();
      return FieldCell[field[cellPosition]].toLowerCase();
    };

    const handleRetention = useCallback(() => {
      handleMouseStatusChange(true);
    }, [handleMouseStatusChange]);

    const handleRelease = useCallback(() => {
      handleMouseStatusChange(false);
    }, [handleMouseStatusChange]);

    const handleLoss = useCallback(
      (newField: Array<number>) => {
        const newMask = [...mask];

        handleDisableChange(true);
        clearInterval(intervalId);
        handleGameLoseChange(true);
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

        handleMaskChange(newMask);
        handleFieldChange(newField);
      },
      [
        handleDisableChange,
        handleFieldChange,
        handleGameLoseChange,
        handleMaskChange,
        handleNumberOfMinesChange,
        intervalId,
        mask,
      ],
    );

    const handleCellClick = useCallback(
      (x: number, y: number): MouseEventHandler<HTMLButtonElement> => {
        const newMask = [...mask];
        const cellPosition = y * SIZE + x;

        const cellAlreadyOpen = newMask[cellPosition] === FieldCell['opened'];
        if (cellAlreadyOpen) return;

        let newField: Array<number>;

        if (isGameStarted) {
          newField = [...field];
        } else {
          newField = createField(SIZE, NUMBER_OF_MINES, x, y);
          startStopWatch();

          newField.forEach(cell => {
            if (cell === FieldCell['mine-activated']) {
              handleNumberOfMinesChange(prev => prev + 1);
            }
          });
        }

        const isMineActivated = newField[cellPosition] === FieldCell['mine-activated'];
        if (isMineActivated) {
          handleLoss(newField);
          return;
        }

        const cells: Array<[number, number]> = [];

        const addClickedCell = (cellByX: number, cellByY: number) => {
          const coordInsideField = cellByX >= 0 && cellByX < SIZE && cellByY >= 0 && cellByY < SIZE;
          const cellIsOpened = newMask[cellByY * SIZE + cellByX] === FieldCell['opened'];

          if (coordInsideField) {
            if (cellIsOpened) return;
            cells.push([cellByX, cellByY]);
          }
        };

        addClickedCell(x, y);

        while (cells.length) {
          const [a, b] = cells.pop();
          const curentCellPosition = b * SIZE + a;

          newMask[curentCellPosition] = FieldCell['opened'];

          const ifEmptyCell = newField[curentCellPosition] === 0;
          if (ifEmptyCell) {
            addClickedCell(a + 1, b);
            addClickedCell(a - 1, b);
            addClickedCell(a, b + 1);
            addClickedCell(a, b - 1);
          }
        }

        handleMaskChange(newMask);
        handleFieldChange(newField);
      },
      [
        field,
        handleFieldChange,
        handleLoss,
        handleMaskChange,
        handleNumberOfMinesChange,
        isGameStarted,
        mask,
        startStopWatch,
      ],
    );

    const handleRightClick = useCallback(
      (evt: MouseEvent<HTMLButtonElement>, x: number, y: number) => {
        evt.preventDefault();
        evt.stopPropagation();

        if (!isGameStarted || isDisabled) return;

        const newMask = [...mask];
        const cellPosition = y * SIZE + x;

        const cellIsOpened = newMask[cellPosition] === FieldCell['opened'];
        if (cellIsOpened) return;

        const cellIsClosed = newMask[cellPosition] === FieldCell['closed'];
        const cellIsFlag = newMask[cellPosition] === FieldCell['flag'];
        const cellIsQuestion = newMask[cellPosition] === FieldCell['question'];

        if (cellIsClosed) {
          const flagAmount = newMask.filter(cell => cell === FieldCell['flag']).length;
          if (flagAmount === NUMBER_OF_MINES) return;
          newMask[cellPosition] = FieldCell['flag'];
          handleNumberOfMinesChange(numberOfMines - 1);
        } else if (cellIsFlag) {
          newMask[cellPosition] = FieldCell['question'];
          handleNumberOfMinesChange(numberOfMines + 1);
        } else if (cellIsQuestion) {
          newMask[cellPosition] = FieldCell['closed'];
        }

        handleMaskChange(newMask);
      },
      [handleMaskChange, handleNumberOfMinesChange, isDisabled, isGameStarted, mask, numberOfMines],
    );

    return (
      <div className="game__field">
        {CELLS.map((a, y) => {
          return (
            <div className="game__field_column" key={y}>
              {CELLS.map((b, x) => {
                return (
                  <Cell
                    key={x}
                    type={CellTypes.FIELD_CELL}
                    item={displayField(x, y)}
                    handleClick={() => handleCellClick(x, y)}
                    handleRightClick={evt => handleRightClick(evt, x, y)}
                    handleRetention={handleRetention}
                    handleRelease={handleRelease}
                    handleOut={handleRelease}
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
