'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ViewImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ViewImageModal({
  isOpen,
  onClose,
  imageUrl,
  title,
}: ViewImageModalProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-bg-overlay"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-image-title"
        className="relative z-10 flex w-full max-w-2xl flex-col gap-3 rounded-xl bg-bg-plain p-6 shadow-lg"
      >
        <div className="flex justify-end ">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md  text-text-muted cursor-pointer transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="relative mt-2 w-full aspect-video">
          {!isImageLoaded && (
            <div className="absolute inset-0 rounded-lg bg-bg-subtle animate-pulse" />
          )}

          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            onLoad={() => setIsImageLoaded(true)}
            className={`object-contain rounded-lg transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
