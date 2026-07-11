import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';

import { cn } from '@/shared/lib/utils/utils';
import { useTranslations } from 'next-intl';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[16px_14px]  border border-transparent bg-clip-padding text-base leading-none font-semibold whitespace-nowrap transition-all outline-none select-none  active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:bg-bg-soft disabled:text-text-muted aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-bg-primary text-text-inverse enabled:hover:bg-bg-primary-saturated data-[hover=true]:bg-bg-primary-saturated dark:disabled:bg-bg-muted',
        outline:
          'border-border border-border-primary bg-bg-plain text-text-primary enabled:hover:bg-bg-primary-fade data-[hover=true]:bg-bg-primary-fade disabled:border-none dark:disabled:bg-bg-muted dark:border-border-primary  dark:text-text-primary-dark dark:enabled:hover:bg-bg-primary-fade dark:data-[hover=true]:bg-bg-primary-fade',
        secondary:
          'bg-bg-primary-fade text-text-primary enabled:hover:bg-bg-primary-faint data-[hover=true]:bg-bg-primary-faint dark:disabled:bg-bg-muted dark:enabled:text-text-plain ',
        subtle:
          'bg-bg-muted text-text-plain enabled:border-border-soft enabled:hover:bg-bg-soft data-[hover=true]:bg-bg-soft dark:disabled:bg-bg-muted dark:enabled:text-text-plain  dark:enabled:hover:border-border-primary dark:data-[hover=true]:border-border-primary',
        ghost:
          'bg-transparent text-text-plain  enabled:hover:bg-bg-soft data-[hover=true]:bg-bg-soft dark:disabled:bg-bg-muted dark:enabled:text-text-plain  dark:enabled:bg-transparent dark:enabled:hover:bg-bg-soft dark:data-[hover=true]:bg-bg-soft',
        destructive:
          'bg-bg-danger text-text-inverse enabled:hover:bg-bg-danger-saturated data-[hover=true]:bg-bg-danger-saturated dark:disabled:bg-bg-muted',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          ' gap-1.5 p-[14px_66px] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  loading,
  forceHover = false,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { loading?: boolean } & {
    forceHover?: boolean;
  }) {
  const t = useTranslations();
  return (
    <ButtonPrimitive
      data-slot="button"
      data-hover={forceHover ? 'true' : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <>
          {t('button.loading')}{' '}
          <LoaderCircle className="animate-spin" />
        </>
      ) : (
        <>{children}</>
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
