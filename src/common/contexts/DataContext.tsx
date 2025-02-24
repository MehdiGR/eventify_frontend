import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

interface Data {}
export const defaultData: Data = {};

export type UseData = {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  echo: any;
};

export const useData = (_newValue: Data, echo: any): UseData => {
  const [data, setData] = useState<Data>(defaultData);
  return { data, setData, echo };
};

interface Props {
  children: React.ReactNode;
}

export const DataContext = createContext<UseData | undefined>(undefined!);
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
const DataProvider = ({ children }: Props) => {
  const [echo, setEcho] = useState<any>(null);

  // Ensure Pusher is globally available before initializing Echo
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.Pusher = Pusher;
    }

    // Initialize Laravel Echo
    const echoInstance = new Echo({
      broadcaster: 'pusher',
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
      forceTLS: true,
      encrypted: true, // Ensures a secure connection
      // authEndpoint: process.env.NEXT_PUBLIC_API_URL + '/broadcasting/auth', // Adjust to your actual endpoint
      // auth: {
      //   headers: {
      //     'X-CSRF-TOKEN':
      //       typeof window !== 'undefined'
      //         ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      //         : '',
      //     Accept: 'application/json',
      //   },
      // },
    });

    // console.log('Echo Instance:', echoInstance);
    // console.log('Pusher Instance:', echoInstance.connector?.pusher);

    // Check if the Pusher connection is available
    if (echoInstance.connector?.pusher?.connection) {
      echoInstance.connector.pusher.connection.bind('error', (err: any) => {
        console.error('Pusher connection error:', err);
      });
    } else {
      console.error('Pusher connection is undefined. Check your Pusher setup.');
    }

    setEcho(echoInstance);

    return () => {
      if (echoInstance) {
        echoInstance.disconnect();
      }
    };
  }, []);

  const { data, setData } = useData(defaultData, echo);
  const value = useMemo(() => ({ data, setData, echo }), [data, setData, echo]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useDataContext };
