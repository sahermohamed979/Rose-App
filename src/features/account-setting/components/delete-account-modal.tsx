'use client';

import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteAccountModalProps) {
  const t = useTranslations('profileForm');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        disabled={isDeleting}
        className="absolute inset-0 bg-bg-overlay"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        className="relative z-10 flex w-full max-w-137 flex-col gap-3 rounded-xl bg-bg-plain p-8 shadow-lg"
      >
        <div className="flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-bg-subtle">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-soft">
              <Trash
                size={32}
                strokeWidth={1.8}
                className="text-text-default"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2
            id="delete-account-title"
            className="text-xl font-bold text-text-plain"
          >
            {t('deleteAccount?')}
          </h2>

          <p className="mt-2 text-base text-text-danger">
            {t('actionPermanent')}
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 rounded-md border border-border-muted bg-bg-plain px-4 py-3 font-medium text-text-plain transition-colors hover:bg-bg-subtle disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('nope')}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-md bg-bg-danger px-4 py-3 font-medium text-text-inverse transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? t('deleting') : t('delete')}
          </button>
        </div>
      </div>
    </div>
  );
}
