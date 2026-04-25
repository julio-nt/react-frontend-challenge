import Query from '@core/query';
import Router from '@core/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

function App() {
  const client = Query.client;

  return (
    <QueryClientProvider client={client}>
      <ToastContainer />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
