'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CheckIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react';

const toastBase =
  'cn-toast  flex  min-h-[53px] items-center gap-3 rounded-lg border px-4 py-3 shadow-[var(--shadow-subtle-sm)]';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: (
          <CheckIcon className="size-4 shrink-0 text-text-success" />
        ),
        info: <InfoIcon className="size-4 shrink-0 text-text-soft" />,
        warning: (
          <TriangleAlertIcon className="size-4 shrink-0 text-text-warning" />
        ),
        error: <XIcon className="size-4 shrink-0 text-text-danger" />,
        loading: (
          <Loader2Icon className="size-4 shrink-0 animate-spin text-text-soft" />
        ),
      }}
      style={
        {
          '--width': '387px',
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: toastBase,
          icon: 'order-1 shrink-0',
          loader:
            '!static shrink-0 opacity-100 !transform-none data-[visible=false]:opacity-100 data-[visible=false]:!scale-100',
          content: 'order-2 min-w-0 flex-1',
          title: 'text-sm font-semibold leading-5 !text-text-plain',
          description: 'text-sm text-text-soft',
          closeButton:
            'order-3 ms-auto flex size-5 shrink-0 items-center justify-center border-none bg-transparent p-0 text-text-soft transition-colors hover:text-text-plain',
          default: '!border-border-muted bg-bg-plain',
          info: '!border-border-muted !bg-bg-muted',
          success: '!border-border-success-faint !bg-bg-success-fade',
          warning: '!border-border-warning-faint !bg-bg-warning-fade',
          error: '!border-border-danger-faint !bg-bg-danger-fade',
        },
      }}
      closeButton
      expand={true}
      duration={3000}
      {...props}
    />
  );
};

export { Toaster };
