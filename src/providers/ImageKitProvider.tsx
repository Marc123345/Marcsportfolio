import { ImageKitProvider as IKProvider } from '@imagekit/react';
import { ReactNode } from 'react';

interface ImageKitProviderProps {
  children: ReactNode;
}

export default function ImageKitProvider({ children }: ImageKitProviderProps) {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/qcvroy8xpd';

  return (
    <IKProvider urlEndpoint={urlEndpoint}>
      {children}
    </IKProvider>
  );
}
