import {FC, memo} from 'react';

import './App.scss';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

const App: FC = memo(() => {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
});

export default App;
