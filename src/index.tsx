import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Reset } from 'styled-reset';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { worker } from 'mocks/browsers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
  <QueryClientProvider client={queryClient}>
    <Reset />
    <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={true} />
    </BrowserRouter>
  </QueryClientProvider>,
);
