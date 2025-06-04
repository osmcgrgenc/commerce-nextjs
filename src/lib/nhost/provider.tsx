'use client';

import { NhostClient, NhostProvider as Provider } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
});

export function NhostProvider({ children }: { children: React.ReactNode }) {
  return <Provider nhost={nhost}>{children}</Provider>;
}
