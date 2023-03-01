import {FC, memo} from 'react';

import Sprite from '../Sprite/Sprite';

import './Header.scss';

const Header: FC = memo(() => {
  return (
    <header className="header">
      <Sprite isButton={false} item="mine" />
      <h1 className="header__title">Сапёр</h1>
    </header>
  );
});

export default Header;
