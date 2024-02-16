import styles from './global.module.scss';
import classNames from 'classnames/bind';
import CheckBox from 'components/checkBox/CheckBox';
import useCustomNavigation from 'hooks/useCustomNavigation';
import Header from 'components/header/Header';
import { useState } from 'react';
const cn = classNames.bind(styles);

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
