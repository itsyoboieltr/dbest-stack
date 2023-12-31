// @refresh reload
import { edenTreaty } from '@elysiajs/eden';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query';
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
import type { App } from './server/app';
import { clientEnv } from './utils/env/client';

export const app = edenTreaty<App>(clientEnv.HOST_URL);

export default function Root() {
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
    <Html lang={'en'}>
      <Head>
        <Title>DBEST</Title>
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
