import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Reset } from 'styled-reset';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

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
