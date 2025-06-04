import { ReactNode } from 'react';
import nhost from '@/lib/nhost/client';
import { redirect } from 'next/navigation';

interface AdminGuardProps {
  children: ReactNode;
}

export default async function AdminGuard({ children }: AdminGuardProps) {
  const sessionResult = await nhost.auth.getSession();
  const session = sessionResult;
  if (!session) {
    redirect('/auth/login');
  }
  const isAdmin = session.user?.roles?.includes('admin') || session.user?.defaultRole === 'admin';
  if (!isAdmin) {
    redirect('/auth/login');
  }
  return <>{children}</>;
}
