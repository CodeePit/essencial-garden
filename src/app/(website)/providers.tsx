"use client"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react'

export function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
  const [queryClient] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}