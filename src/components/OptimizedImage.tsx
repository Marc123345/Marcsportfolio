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
}: OptimizedImageProps) {
  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/qcvroy8xpd';

  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');

  if (isExternalUrl) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
      />
    );
  }

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

  const imagePath = src.startsWith('/') ? src : `/${src}`;
  const imageUrl = `${urlEndpoint}${imagePath}?tr=${finalTransformations}`;

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}
