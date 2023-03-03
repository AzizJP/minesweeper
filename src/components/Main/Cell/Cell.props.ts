import {MouseEventHandler, FocusEventHandler} from 'react';

export interface CellProps {
  type: string;
  item: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  handleRightClick?: MouseEventHandler<HTMLButtonElement>;
  handleRetention?: MouseEventHandler<HTMLButtonElement>;
  handleRelease?: MouseEventHandler<HTMLButtonElement>;
  handleBlur?: FocusEventHandler<HTMLButtonElement>;
  handleOut?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}
