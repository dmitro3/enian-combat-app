import { ErrorBoundary } from '@/components/ErrorBoundary';
import { API_ROUTES } from '@/constant/api-route';
import axiosInstance from '@/api/axiosInstance';
import { PropsWithChildren, useEffect } from 'react';
import { removeAccessToken } from '@/api/authHelper';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const handleBeforeUnload = (_: BeforeUnloadEvent) => {
      removeAccessToken()
      axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      {children}
    </ErrorBoundary>
  );
}