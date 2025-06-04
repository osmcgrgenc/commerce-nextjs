import { User } from '@nhost/core';

declare module '@nhost/react' {
  export function useSignInEmailPassword(): {
    signInEmailPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
    isLoading: boolean;
    error: Error | null;
  };

  export function useSignInWithOAuth(): {
    signInWithOAuth: (options: {
      provider: 'google' | 'github';
    }) => Promise<{ error: Error | null }>;
    isLoading: boolean;
  };

  export function useAuthenticationStatus(): {
    isAuthenticated: boolean;
    isLoading: boolean;
  };

  export function useUserData(): User | null;

  export function useUpdateUserData(): {
    updateUserData: (data: {
      displayName?: string;
      avatarUrl?: string;
    }) => Promise<{ error: Error | null }>;
    isLoading: boolean;
  };
}
