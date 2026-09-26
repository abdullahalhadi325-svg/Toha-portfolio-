'use client';

import React, { useState } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className = '',
  referrerPolicy = 'no-referrer',
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? 'absolute inset-0 w-full h-full' : ''
      }`}
      style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {/* Subtle skeleton pulse */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#16161B] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-700 ${
          isLoaded ? 'opacity-100 filter-none' : 'opacity-0 blur-sm'
        } ${fill ? 'w-full h-full object-cover' : ''} ${className}`}
        {...props}
      />
    </div>
  );
}
