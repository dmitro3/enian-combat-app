import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PropsWithChildren } from 'react';

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
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      {children}
    </ErrorBoundary>
  );
}