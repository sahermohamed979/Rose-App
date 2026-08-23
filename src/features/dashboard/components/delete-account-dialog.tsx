'use client';

import { useEffect, useRef } from 'react';
import { Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/utils';

interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteAccountDialog({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteAccountDialogProps) {
  const t = useTranslations('dashboard.profilePage');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className={cn(
          'relative z-10 w-full max-w-sm bg-bg-plain rounded-2xl shadow-2xl p-6',
          'border border-border-subtle',
          'flex flex-col items-center gap-5',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        {/* Close X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 end-4 text-text-soft hover:text-text-plain transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Trash icon */}
        <div className="h-16 w-16 rounded-full bg-bg-subtle flex items-center justify-center">
          <Trash2 className="h-7 w-7 text-text-soft" />
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-1.5">
          <h2
            id="delete-dialog-title"
            className="text-text-plain font-bold text-lg leading-snug"
          >
            {t('deleteDialog.title')}
          </h2>
          <p className="text-text-danger text-sm font-medium">
            {t('deleteDialog.subtitle')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full mt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border-subtle text-text-plain text-sm font-semibold hover:bg-bg-subtle transition-colors disabled:opacity-50"
          >
            {t('deleteDialog.cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                {t('deleteDialog.deleting')}
              </>
            ) : (
              t('deleteDialog.confirm')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
