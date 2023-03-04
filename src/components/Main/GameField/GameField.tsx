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

    const handleRetention = useCallback(
      (evt: MouseEvent<HTMLButtonElement>, x: number, y: number) => {
        const newMask = [...mask];

        if (evt.button === 0) {
          const cellIsNotOpened = newMask[y * SIZE + x] !== FieldCell['opened'];
          if (cellIsNotOpened) {
            handleMouseStatusChange(true);
          }
        }
      },
      [handleMouseStatusChange, mask],
    );

    const handleRelease = useCallback(() => {
      handleMouseStatusChange(false);
    }, [handleMouseStatusChange]);

    const handleCellClick = useCallback(
      (x: number, y: number): MouseEventHandler<HTMLButtonElement> => {
        const newMask = [...mask];
        const cellPosition = y * SIZE + x;

        const cellAlreadyOpen = newMask[cellPosition] === FieldCell['opened'];
        if (cellAlreadyOpen) return;

        const cellIsFlag = newMask[cellPosition] === FieldCell['flag'];
        if (cellIsFlag) return;

        let newField: Array<number>;

        if (isGameStarted) {
          newField = [...field];
        } else {
          newField = createField(SIZE, NUMBER_OF_MINES, x, y);
          startStopWatch();

          newField.forEach(cell => {
            const cellIsMine = cell === FieldCell['mine-activated'];
            if (cellIsMine) {
              handleNumberOfMinesChange(prev => prev + 1);
            }
          });
        }

        const handleLoss = () => {
          handleDisableChange(true);
          clearInterval(intervalId);
          handleGameLoseChange(true);
          let mines = 0;

          newField.forEach((cell, idx) => {
            const currentCellIsQuestion = newMask[idx] === FieldCell['question'];
            if (currentCellIsQuestion) {
              newMask[idx] = FieldCell['question-clicked'];
            }

            const currentCellIsMine = cell === FieldCell['mine-activated'];
            const currentCellIsFlag = newMask[idx] === FieldCell['flag'];
            const indexMatchesClickedCell = idx === cellPosition;
            if (currentCellIsMine) {
              if (currentCellIsFlag && !indexMatchesClickedCell) {
                newMask[idx] = FieldCell['mine-cleared'];
              } else if (indexMatchesClickedCell) {
                newMask[idx] = FieldCell['opened'];
              } else {
                newMask[idx] = FieldCell['mine'];
              }
            }

            const mineFinded = newMask[idx] === FieldCell['mine-cleared'];
            if (mineFinded) {
              mines++;
            }
          });

          handleNumberOfMinesChange(NUMBER_OF_MINES - mines);
          handleMaskChange(newMask);
          handleFieldChange(newField);
        };

        const isMineActivated = newField[cellPosition] === FieldCell['mine-activated'];
        if (isMineActivated) {
          handleLoss();
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
        handleDisableChange,
        handleFieldChange,
        handleGameLoseChange,
        handleMaskChange,
        handleNumberOfMinesChange,
        intervalId,
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
          if (flagAmount >= NUMBER_OF_MINES) {
            newMask[cellPosition] = FieldCell['question'];
          } else {
            newMask[cellPosition] = FieldCell['flag'];
            handleNumberOfMinesChange(prev => prev - 1);
          }
        } else if (cellIsFlag) {
          newMask[cellPosition] = FieldCell['question'];
          handleNumberOfMinesChange(prev => prev + 1);
        } else if (cellIsQuestion) {
          newMask[cellPosition] = FieldCell['closed'];
        }

        handleMaskChange(newMask);
      },
      [handleMaskChange, handleNumberOfMinesChange, isDisabled, isGameStarted, mask],
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
                    handleRetention={evt => handleRetention(evt, x, y)}
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
