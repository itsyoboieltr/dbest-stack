import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import type { App as ElysiaApp } from './routes/api';
import { clientEnv } from './utils/env/client';
import { edenTreaty } from '@elysiajs/eden';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query';
import { MetaProvider, Title } from '@solidjs/meta';
import './app.css';

export const app = edenTreaty<ElysiaApp>(clientEnv.HOST_URL);

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: (previousData: unknown) => previousData,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: async () => {
        await queryClient.invalidateQueries();
      },
    }),
  });
  return (
    <Router
      root={(props) => (
        <>
          <MetaProvider>
            <Title>DBEST Stack</Title>
            <QueryClientProvider client={queryClient}>
              <Suspense>{props.children}</Suspense>
            </QueryClientProvider>
          </MetaProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
