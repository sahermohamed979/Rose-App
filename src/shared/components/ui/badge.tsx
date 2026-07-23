import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils/utils';

const badgeVariants = cva(
  'group/badge inline-flex  w-fit shrink-0 items-center justify-center gap-1 border-none overflow-hidden rounded-4xl  px-2 py-0.5 text-xs leading-none font-medium whitespace-nowrap transition-all   has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-border-danger aria-invalid:ring-ring-danger/20 dark:aria-invalid:ring-ring-danger/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default:
          'bg-bg-primary text-text-inverse [a]:hover:bg-bg-primary-saturated hover:bg-bg-primary-saturated data-[hover=true]:bg-bg-primary-saturated',
        secondary:
          'bg-bg-secondary-faint text-text-primary [a]:hover:bg-bg-secondary-fade hover:bg-bg-secondary-fade data-[hover=true]:bg-bg-secondary-fade',
        subtle:
          'bg-bg-soft text-text-plain [a]:hover:bg-bg-muted hover:bg-bg-muted data-[hover=true]:bg-bg-muted',
        destructive:
          "bg-bg-danger text-white focus-visible:outline-none  dark:focus-visible:outline-none [a]:hover:bg-destructive/20",
        // outline:
        //   "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        // ghost:
        //   "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        // link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  render,
  forceHover = false,
  ...props
}: useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { forceHover?: boolean }) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        'data-hover': forceHover ? 'true' : undefined,
        className: cn(badgeVariants({ variant }), className),
      } as React.HTMLAttributes<HTMLSpanElement>,
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
