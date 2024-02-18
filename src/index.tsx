import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Reset } from 'styled-reset';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { worker } from 'mocks/browsers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

if (process.env.REACT_APP_MSW_MOKING === 'true') {
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <Reset />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {' '}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </>,
);
