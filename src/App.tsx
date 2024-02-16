import styles from './hello.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function App() {
  return (
    <div className="App">
      <h1 className={cn('title')}>hello</h1>
    </div>
  );
}

export default App;
