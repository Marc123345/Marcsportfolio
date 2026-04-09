import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, checkSupabaseConnection, testNetworkConnectivity } from '@/lib/supabase';

interface SupabaseContextType {
  isConnected: boolean;
  isNetworkAvailable: boolean;
  connectionStatus: 'checking' | 'connected' | 'disconnected' | 'network-error';
  checkConnection: () => Promise<void>;
  lastChecked: Date | null;
}

const SupabaseContext = createContext<SupabaseContextType>({
  isConnected: true, // Default to true to allow form submission
  isNetworkAvailable: true,
  connectionStatus: 'connected',
  checkConnection: async () => {},
  lastChecked: null,
});

export function useSupabase() {
  return useContext(SupabaseContext);
}

interface Props {
  children: React.ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const [isConnected, setIsConnected] = useState(true); // Default to true to allow form submission
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected' | 'network-error'>('connected');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = useCallback(async () => {
    if (isChecking) return;
    
    try {
      setIsChecking(true);

      // In development, assume connection is good to avoid CORS issues
      if (import.meta.env.DEV) {
        setConnectionStatus('connected');
        setIsConnected(true);
        setIsNetworkAvailable(true);
        setLastChecked(new Date());
        return;
      }

      setConnectionStatus('checking');
      const connected = await checkSupabaseConnection();
      setLastChecked(new Date());
      
      if (connected) {
        setConnectionStatus('connected');
        setIsConnected(true);
      } else {
        setConnectionStatus('disconnected');
        setIsConnected(true); // Still allow operations to proceed
      }
    } catch (error: any) {
      console.warn('Connection check error (non-fatal):', error.message || 'Unknown error');
      setConnectionStatus('disconnected');
      setIsConnected(true); // Allow operations to proceed
      setLastChecked(new Date());
    } finally {
      setIsChecking(false);
    }
  }, [isChecking]);

  useEffect(() => {
    // Only do connection checks in production
    if (!import.meta.env.DEV) {
      const timer = setTimeout(() => {
        checkConnection();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [checkConnection]);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsNetworkAvailable(true);
      setTimeout(() => {
        checkConnection();
      }, 1000);
    };

    const handleOffline = () => {
      console.warn('Network connection lost');
      setIsNetworkAvailable(false);
      setConnectionStatus('network-error');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection]);

  const value = useMemo(() => ({
    isConnected,
    isNetworkAvailable,
    connectionStatus,
    checkConnection,
    lastChecked,
  }), [isConnected, isNetworkAvailable, connectionStatus, checkConnection, lastChecked]);

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}