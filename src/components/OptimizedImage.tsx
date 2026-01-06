import { Image } from '@imagekit/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
  transformations?: string;
  lqip?: { active?: boolean; quality?: number };
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  quality = 80,
  format = 'auto',
  transformations,
  lqip = { active: true, quality: 20 }
}: OptimizedImageProps) {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/qcvroy8xpd';

  const defaultTransformations = [];

  if (width) {
    defaultTransformations.push(`w-${width}`);
  }

  if (height) {
    defaultTransformations.push(`h-${height}`);
  }

  defaultTransformations.push(`q-${quality}`);

  if (format !== 'auto') {
    defaultTransformations.push(`f-${format}`);
  } else {
    defaultTransformations.push('f-auto');
  }

  defaultTransformations.push('dpr-2');

  const finalTransformations = transformations || defaultTransformations.join(',');

  return (
    <Image
      urlEndpoint={urlEndpoint}
      path={src}
      transformation={[{ raw: finalTransformations }]}
      width={width}
      height={height}
      alt={alt}
      className={className}
      loading={loading}
      lqip={lqip}
    />
  );
}
