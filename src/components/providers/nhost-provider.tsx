'use client';

import { NhostClient, NhostProvider as Provider } from '@nhost/nextjs';
import { ReactNode } from 'react';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
});

interface NhostProviderProps {
  children: ReactNode;
}

export function NhostProvider({ children }: NhostProviderProps) {
  return <Provider nhost={nhost}>{children}</Provider>;
}
