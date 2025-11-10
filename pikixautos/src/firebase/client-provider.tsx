'use client';

import React, { useMemo, type ReactNode, useState, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface FirebaseServices {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [services, setServices] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    // This function is defined here to ensure it's only part of the client bundle.
    function initializeFirebase(): FirebaseServices {
      if (getApps().length === 0) {
        const firebaseApp = initializeApp(firebaseConfig);
        const auth = getAuth(firebaseApp);
        const firestore = getFirestore(firebaseApp);
        return { firebaseApp, auth, firestore };
      } else {
        const app = getApp();
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        return { firebaseApp: app, auth, firestore };
      }
    }

    setServices(initializeFirebase());
  }, []); // Empty dependency array ensures this runs only once on mount, on the client.

  if (!services) {
    // Render nothing or a loading spinner until Firebase is initialized on the client.
    // This prevents any child components from trying to use Firebase before it's ready.
    return null; 
  }

  return (
    <FirebaseProvider
      firebaseApp={services.firebaseApp}
      auth={services.auth}
      firestore={services.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
