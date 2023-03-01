import {FC, memo} from 'react';

import './Sprite.scss';

interface SpriteProps {
  isButton: boolean;
  item: string;
}

const Sprite: FC<SpriteProps> = memo(({isButton, item}) => {
  return (
    <>
      {isButton ? (
        <button type="button" className={`srpite sprite_button srpite_${item}`} />
      ) : (
        <div className={`srpite srpite_${item}`} />
      )}
    </>
  );
});

export default Sprite;
