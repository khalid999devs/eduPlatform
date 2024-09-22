import { Link, useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const [isOffline, setIsOffline] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const offline = searchParams.get('offline');

  // Detect if the user is offline
  useEffect(() => {
    function handleOfflineStatus() {
      setIsOffline(!navigator.onLine);
    }

    window.addEventListener('offline', handleOfflineStatus);
    window.addEventListener('online', handleOfflineStatus);

    return () => {
      window.removeEventListener('offline', handleOfflineStatus);
      window.removeEventListener('online', handleOfflineStatus);
    };
  }, []);

  return (
    <div className='flex h-screen items-center justify-center bg-root_bluish text-Text'>
      <div className='bg-trans_bluish p-10 rounded-md shadow-lg text-center'>
        {isOffline || offline == 1 ? (
          <>
            <h1 className='text-4xl font-bold text-secondary-main mb-5'>
              No Internet Connection
            </h1>
            <p className='text-lg mb-8'>
              It looks like you're offline. Please check your network and try
              again.
            </p>
            <Link
              to={-1}
              className='bg-secondary-main text-root_bluish px-6 py-2 rounded-md font-bold text-lg hover:bg-secondary-dark transition-colors'
            >
              Go Back
            </Link>
          </>
        ) : (
          <>
            <h1 className='text-4xl font-bold text-secondary-main mb-5'>
              Oops!
            </h1>
            <p className='text-lg mb-5'>
              Sorry, an unexpected error has occurred.
            </p>
            <p className='italic text-primary-main mb-8'>
              {error?.statusText || error?.message}
            </p>
            <Link
              to={'/'}
              className='bg-secondary-main text-root_bluish px-6 py-2 rounded-md font-bold text-lg hover:bg-secondary-dark transition-colors'
            >
              Go Back Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
