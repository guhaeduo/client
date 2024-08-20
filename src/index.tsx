import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './css/font.scss';
import './index.scss';
import { Reset } from 'styled-reset';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { store, persistor } from './store'; // Redux 스토어 및 Persistor 가져오기

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <Reset />
        <HelmetProvider>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
            <ReactQueryDevtools initialIsOpen={true} />
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

root.render(app);
