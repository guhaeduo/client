import styles from './hello.module.scss';
import classNames from 'classnames/bind';
import CheckBox from 'components/checkBox/CheckBox';
const cn = classNames.bind(styles);

function App() {
  return (
    <div className="App">
      <h1 className={cn('title')}>hello</h1>
      <CheckBox value={true} onClick={() => console.log('good')} />
    </div>
  );
}

export default App;
