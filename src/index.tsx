import CreateDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Redux 스토어 및 Persistor 가져오기
import './index.scss';
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

if (
  process.env.REACT_APP_MSW_MOKING === 'true' &&
  process.env.NODE_ENV === 'development'
) {
  worker.start({
    serviceWorker: {
      url: '/client/mockServiceWorker.js',
    },
  });
}

const root = CreateDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <Reset />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
          <ReactQueryDevtools initialIsOpen={true} />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
);
