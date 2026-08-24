'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CloudUpload } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useUploadPhoto } from '@/shared/lib/hooks/use-upload-photo';

type ProfilePhotoProps = {
  photo?: string;
  onPhotoUploaded: (url: string) => void;
};

export default function ProfilePhoto({
  photo,
  onPhotoUploaded,
}: ProfilePhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const t = useTranslations('profileForm');
  const tToast = useTranslations('profileForm.toast');
  const { mutate: uploadPhotoMutation, isPending: isUploading } =
    useUploadPhoto();

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(tToast('validImage'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(tToast('imageSize'));
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewRef.current = objectUrl;
    setPreview(objectUrl);

    uploadPhotoMutation(file, {
      onSuccess: (result) => {
        if (!result.status) {
          toast.error(result.message);
          return;
        }

        onPhotoUploaded(result.payload.url);
        toast.success(tToast('photoUpdatedSuccess'));
      },

      onError: () => {
        toast.error(tToast('photoUpdatedError'));
        if (previewRef.current) {
          URL.revokeObjectURL(previewRef.current);
          previewRef.current = null;
        }
        setPreview(null);
      },
    });
  };

  return (
    <div className="p-4 flex items-center gap-4">
      <div className="relative shrink-0">
        <Image
          src={preview || photo || '/default-avatar.png'}
          alt="Profile photo"
          width={72}
          height={72}
          className="rounded-full object-cover w-20 h-20"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="absolute -bottom-2 -right-2 bg-bg-subtle rounded-full p-1.5 border border-border-muted disabled:opacity-50"
        >
          <CloudUpload size={20} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-base">
          {t('uploadPhoto')}
        </h3>

        <p className="text-sm text-text-soft mt-1">
          {t('uploadPhotoType')}
        </p>

        {isUploading && (
          <p className="text-sm text-text-soft mt-1">
            {t('uploadingPhoto')}
          </p>
        )}
      </div>
    </div>
  );
}
