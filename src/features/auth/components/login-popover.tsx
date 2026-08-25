'use client';

import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import LoginForm from './login-form';
import { cn } from '@/shared/lib/utils/utils';

interface LoginPopoverProps {
  children: ReactElement;
}

export default function LoginPopover({
  children,
}: LoginPopoverProps) {
  // Translations
  const tLogin = useTranslations('login');
  const tRegister = useTranslations('register');

  // Navigation
  const router = useRouter();

  // State
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Functions
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  // Effects
  useEffect(() => {
    return clearCloseTimer;
  }, []);

  return (
    <Popover open={open}>
      <PopoverTrigger
        render={children}
        nativeButton={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <PopoverContent
        align="end"
        className="w-96 pt-0 p-0 rounded-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Tabs defaultValue="login" className="gap-0">
          <TabsList className="mb-0 w-full rounded-2xl">
            <TabsTrigger
              value="login"
              className="border-[1px] rounded-b-none!"
            >
              {tLogin('button')}
            </TabsTrigger>
            <TabsTrigger
              className="rounded-b-none! border-[1px]"
              value="register"
              onClick={() => {
                router.push('/register');
                setOpen(false);
                clearCloseTimer();
              }}
            >
              {tRegister('register')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="p-4 pb-5">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
