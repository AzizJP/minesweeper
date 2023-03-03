export enum Emoji {
  SMILE = 'smile',
  SMILE_CLICKED = 'smile-clicked',
  OPEN_MOUTH = 'open-mouth',
  SUNGLASSES = 'sunglasses',
  DEATH = 'death',
}
export interface TimeDisplay {
  firstDisplay: number;
  secondDisplay: number;
  thirdDisplay: number;
}

export interface MineDisplay {
  firstDisplay: number;
  secondDisplay: number;
  thirdDisplay: number;
}

export enum Numbers {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
}

export enum CellTypes {
  NUMBER = 'number',
  FIELD_CELL = 'field-cell',
  EMOJI = 'emoji',
}
