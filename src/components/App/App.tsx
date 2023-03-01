import {FC, memo} from 'react';

import './App.scss';

import Header from '../Header/Header';

const App: FC = memo(() => {
  return (
    <div className="page">
      <Header />
    </div>
  );
});

export default App;
