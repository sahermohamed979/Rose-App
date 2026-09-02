'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { CloudUpload, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProfileAvatarProps {
  photoUrl?: string | null;
  firstName: string;
  onPhotoChange: (file: File) => void;
  onPhotoRemove?: () => void;
}

function getFullImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || 'https://rose-app.elevate-bootcamp.cloud';
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function ProfileAvatar({
  photoUrl,
  firstName,
  onPhotoChange,
  onPhotoRemove,
}: ProfileAvatarProps) {
  const t = useTranslations('dashboard.profilePage');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initial = firstName ? firstName.charAt(0).toUpperCase() : '?';
  const resolvedUrl = getFullImageUrl(photoUrl);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  }

  function handleRemove() {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onPhotoRemove) {
      onPhotoRemove();
    }
  }

  return (
    <div className="flex items-center gap-5">
      {/* Avatar Container with rounded-full & overflow-hidden */}
      <div className="relative shrink-0">
        <div className="h-20 w-20 aspect-square rounded-full overflow-hidden border-2 border-border-subtle bg-bg-subtle flex items-center justify-center relative">
          {resolvedUrl ? (
            <Image
              src={resolvedUrl}
              alt={firstName}
              fill
              sizes="80px"
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-text-primary select-none">
              {initial}
            </span>
          )}
        </div>

        {/* Upload overlay button matching design (white/bg-plain circle with cloud-upload icon) */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label={t('uploadPhoto')}
          className="absolute -bottom-1 -end-1 h-7 w-7 rounded-full bg-bg-plain flex items-center justify-center border border-border-subtle shadow-subtle hover:bg-bg-subtle transition-colors cursor-pointer"
        >
          <CloudUpload className="h-4 w-4 text-text-plain" />
        </button>

        {/* Remove overlay button if photo exists */}
        {resolvedUrl && onPhotoRemove && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label={t('removePhoto')}
            className="absolute -top-1 -end-1 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-subtle transition-colors cursor-pointer border border-bg-plain"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="text-text-plain font-semibold text-base">
            {t('uploadPhoto')}
          </p>
          {resolvedUrl && onPhotoRemove && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-text-danger hover:underline font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              {t('removePhoto')}
            </button>
          )}
        </div>
        <p className="text-text-soft text-sm">{t('uploadPhotoHint')}</p>
      </div>
    </div>
  );
}
