import {FC, memo, MouseEventHandler} from 'react';

import './Sprite.scss';

interface SpriteProps {
  type: string;
  item: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  handleRightClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

const Sprite: FC<SpriteProps> = memo(({type, item, handleClick, handleRightClick, isDisabled}) => {
  if (type === 'field-cell')
    return (
      <button
        type="button"
        className={`sprite sprite__button sprite__button_${item}`}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        disabled={isDisabled}
      />
    );
  if (type === 'number') return <div className={`sprite sprite__number sprite__number_${item}`} />;
  if (type === 'emoji')
    return <button type="button" className={`sprite sprite__emoji sprite__emoji_${item}`} onClick={handleClick} />;
});

export default Sprite;
