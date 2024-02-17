import styles from './global.module.scss';
import classNames from 'classnames/bind';
import Header from 'components/header/Header';

const cn = classNames.bind(styles);

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
