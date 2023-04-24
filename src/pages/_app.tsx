import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';

export const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Toaster toastOptions={{ duration: 10_000 }} />
        <Layout>
          <NextNProgress />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
