import Query from '@core/query';
import Router from '@core/router';
import { useThemeStore } from '@modules/_layout/storage/theme';
import { Toaster } from '@shared/components/ui/sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

function App() {
  const client = Query.client;
  const { theme } = useThemeStore();

  useEffect(() => {
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <QueryClientProvider client={client}>
      <main>
        <Router />
        <Toaster />
      </main>
    </QueryClientProvider>
  );
}

export default App;
