'use client';

// 1. React / Next.js core
import { useState } from 'react';

// 2. Third-party libraries
import { useTranslations } from 'next-intl';
import {
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Home,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// 3. Internal aliases
import { Link } from '@/i18n/navigation';
import {
  Button,
  buttonVariants,
} from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/utils';

interface ErrorCartViewProps {
  title?: string;
  subtitle?: string;
  error?: Error & { digest?: string };
  reset?: () => void;
  primaryActionText?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  showHomeLink?: boolean;
}

export function ErrorCartView({
  title,
  subtitle,
  error,
  reset,
  primaryActionText,
  secondaryActionText,
  secondaryActionHref = '/products',
  showHomeLink = true,
}: ErrorCartViewProps) {
  // Translation
  const t = useTranslations('cartError');

  // State
  const [showDetails, setShowDetails] = useState(false);

  // Variables
  const resolvedTitle = title ?? t('title');
  const resolvedSubtitle = subtitle ?? t('subtitle');
  const resolvedPrimaryText = primaryActionText ?? t('retry');
  const resolvedSecondaryText =
    secondaryActionText ?? t('continueShopping');

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg mx-auto text-center flex flex-col items-center">
        {/* Animated Badge Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-danger/10 blur-xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-bg-soft border border-border-soft dark:border-border-primary flex items-center justify-center text-danger shadow-lg">
            <AlertCircle className="w-10 h-10 stroke-[1.75]" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-text-plain tracking-tight mb-3">
          {resolvedTitle}
        </h1>
        <p className="text-base text-text-muted max-w-md leading-relaxed mb-8">
          {resolvedSubtitle}
        </p>

        {/* Primary and Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mb-6">
          {reset && (
            <Button
              onClick={() => reset()}
              variant="default"
              size="lg"
              className="w-full sm:w-auto min-w-[140px] gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{resolvedPrimaryText}</span>
            </Button>
          )}

          {secondaryActionHref && (
            <Link
              href={secondaryActionHref}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'w-full sm:w-auto min-w-[140px] gap-2'
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{resolvedSecondaryText}</span>
            </Link>
          )}
        </div>

        {/* Tertiary Action: Back to Home */}
        {showHomeLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-primary transition-colors py-1"
          >
            <Home className="w-4 h-4" />
            <span>{t('goHome')}</span>
          </Link>
        )}

        {/* Technical Error Details Accordion */}
        {error && (error.message || error.digest) && (
          <div className="w-full mt-8 border-t border-border-soft pt-6 text-start">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full text-xs font-semibold text-text-muted hover:text-text-plain transition-colors uppercase tracking-wider py-1"
            >
              <span>{t('errorDetails')}</span>
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 p-4 rounded-xl bg-bg-soft/80 border border-border-soft text-start space-y-2 overflow-x-auto text-xs font-mono">
                {error.message && (
                  <div>
                    <span className="text-text-muted font-sans font-semibold block mb-0.5">
                      {t('message')}
                    </span>
                    <p className="text-danger break-words">
                      {error.message}
                    </p>
                  </div>
                )}
                {error.digest && (
                  <div>
                    <span className="text-text-muted font-sans font-semibold block mb-0.5">
                      {t('digest')}
                    </span>
                    <p className="text-text-muted">{error.digest}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
