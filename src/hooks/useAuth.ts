import { useAuthenticationStatus, useSignInEmailPassword, useSignOut } from '@nhost/nextjs';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const { signInEmailPassword, isLoading: isSigningIn } = useSignInEmailPassword();
  const { signOut, isSuccess: isSigningOut } = useSignOut();

  const login = async (email: string, password: string) => {
    const { error } = await signInEmailPassword(email, password);
    if (error) {
      throw error;
    }
    router.push('/');
  };

  const logout = async () => {
    await signOut();
    router.push('/');
  };

  return {
    isAuthenticated,
    isLoading,
    isSigningIn,
    isSigningOut,
    login,
    logout,
  };
}
