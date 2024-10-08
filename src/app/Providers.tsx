'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { domAnimation, LazyMotion } from 'framer-motion';
import { PropsWithChildren, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
