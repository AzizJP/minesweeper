import {FC, memo} from 'react';

import {CellProps} from './Cell.props';

import './Cell.scss';

const Cell: FC<CellProps> = memo(
  ({type, item, handleClick, handleRightClick, handleRetention, handleRelease, handleBlur, handleOut, isDisabled}) => {
    if (type === 'field-cell')
      return (
        <button
          type="button"
          className={`sprite sprite__button sprite__button_${item}`}
          onClick={handleClick}
          onContextMenu={handleRightClick}
          onMouseDown={handleRetention}
          onBlur={handleBlur}
          onMouseUp={handleRelease}
          onMouseOut={handleOut}
          disabled={isDisabled}
        />
      );
    if (type === 'number') return <div className={`sprite sprite__number sprite__number_${item}`} />;
    if (type === 'emoji')
      return (
        <button
          type="button"
          className={`sprite sprite__emoji sprite__emoji_${item}`}
          onClick={handleClick}
          onMouseDown={handleRetention}
          onBlur={handleBlur}
          onMouseUp={handleRelease}
          onMouseOut={handleOut}
        />
      );
  },
);

export default Cell;
