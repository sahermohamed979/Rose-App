'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ViewImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  imageUrls?: string[];
  title: string;
}

export default function ViewImageModal({
  isOpen,
  onClose,
  imageUrl,
  imageUrls,
  title,
}: ViewImageModalProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = imageUrls?.length
    ? imageUrls
    : imageUrl
      ? [imageUrl]
      : [];
  const currentImage = images[currentImageIndex];

  const showPreviousImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((index) =>
      index === 0 ? images.length - 1 : index - 1
    );
  };

  const showNextImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  const showImage = (index: number) => {
    setIsImageLoaded(false);
    setCurrentImageIndex(index);
  };

  if (!isOpen || !currentImage) {
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
        className="relative z-10 flex w-full max-w-4xl flex-col rounded-2xl bg-bg-plain p-6 shadow-lg sm:p-8"
      >
        <h2 id="view-image-title" className="sr-only">
          {title}
        </h2>

        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md text-text-muted transition-colors hover:text-text-plain"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border-soft">
          {!isImageLoaded && (
            <div className="absolute inset-0 rounded-lg bg-bg-subtle animate-pulse" />
          )}

          <Image
            src={currentImage}
            alt={`${title} ${currentImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            onLoad={() => setIsImageLoaded(true)}
            className={`object-contain rounded-lg transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {images.length > 1 && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <div
              className="flex flex-wrap items-center gap-2"
              aria-label="Gallery pagination"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => showImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={
                    index === currentImageIndex ? 'true' : undefined
                  }
                  className={`size-3 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? 'bg-bg-danger'
                      : 'bg-bg-muted'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 rtl:flex-row-reverse">
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Previous image"
                className="flex size-9 items-center justify-center rounded-full border border-border-danger text-text-danger transition-colors hover:bg-bg-danger-fade"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Next image"
                className="flex size-9 items-center justify-center rounded-full border border-border-danger text-text-danger transition-colors hover:bg-bg-danger-fade"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
