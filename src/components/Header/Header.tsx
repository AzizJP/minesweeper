import {FC, memo} from 'react';

import './Header.scss';

const Header: FC = memo(() => {
  return (
    <div className="header">
      <h1 className="header__title">Hello, World!</h1>
    </div>
  );
});

export default Header;
