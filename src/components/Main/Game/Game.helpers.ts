export const MINE = -1;

export const createField = (size: number, numberOfMines: number) => {
  const field: Array<number> = new Array(size * size).fill(0);

  const countMinesNearby = (x: number, y: number) => {
    if (field[y * size + x] === MINE) return;

    if (x >= 0 && x < size && y >= 0 && y < size) {
      field[y * size + x] += 1;
    }
  };

  for (let i = 0; i < numberOfMines; i++) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[y * size + x] === MINE) continue;
    field[y * size + x] = MINE;

    countMinesNearby(x + 1, y);
    countMinesNearby(x - 1, y);
    countMinesNearby(x, y + 1);
    countMinesNearby(x, y - 1);
    countMinesNearby(x + 1, y + 1);
    countMinesNearby(x + 1, y - 1);
    countMinesNearby(x - 1, y + 1);
    countMinesNearby(x - 1, y - 1);
  }

  return field;
};
