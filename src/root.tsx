// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query';
import { edenTreaty } from '@elysiajs/eden';
import type { App } from './server/api';
import { clientEnv } from './utils/env/client';

export const app = edenTreaty<App>(clientEnv.HOST_URL);

export default function Root() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
    mutationCache: new MutationCache({
      onSuccess: async () => {
        await queryClient.invalidateQueries();
      },
    }),
  });
  return (
    <Html lang={'en'}>
      <Head>
        <Title>SETD</Title>
        <Meta charset={'utf-8'} />
        <Meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1'}
        />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <FileRoutes />
              </Routes>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
