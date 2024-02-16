import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Reset } from 'styled-reset';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <>
    <Reset />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
);
