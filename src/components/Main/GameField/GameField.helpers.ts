import {FieldCell} from './GameField.types';

export const SIZE = 16;
export const NUMBER_OF_MINES = 5;
export const CELLS = new Array(SIZE).fill(FieldCell['closed']);
