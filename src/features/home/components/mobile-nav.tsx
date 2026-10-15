'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import {
  LogOut,
  Menu,
  ScrollText,
  Settings,
  User as UserIcon,
  X,
  Search,
  Sparkles,
  ArrowRight,
  MapPin,
} from 'lucide-react';

import { NAV_LINKS } from '../consts/nav-links.constant';
import LangToggle from '@/shared/components/ui/langToggle';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

export default function MobileNav() {
  const tHeader = useTranslations('header');
  const tUserMenu = useTranslations('userMenu');
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Client-side mount check for createPortal
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Functions
  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }
    close();
    router.push(
      `/products?q=${encodeURIComponent(searchQuery.trim())}`
    );
  };

  // Focus trap & Escape key
  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();
    const drawer = drawerRef.current;
    if (!drawer) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.closest('[inert]'));

        if (focusable.length === 0) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () =>
      document.removeEventListener('keydown', handleKeyDown);
  }, [open, close]);

  // Prevent body scroll when drawer is open
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

  // Drawer Portal Content (mounted on document.body to avoid header stacking context / backdrop-blur)
  const drawerContent =
    mounted && open
      ? createPortal(
          <>
            {/* ── Backdrop Overlay ─────────────────────────────── */}
            <div
              aria-hidden="true"
              onClick={close}
              className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-xs md:hidden animate-in fade-in-0 duration-200"
            />

            {/* ── Luxury Drawer Sheet ───────────────────────────── */}
            <nav
              ref={drawerRef}
              id="mobile-menu"
              role="navigation"
              aria-label={tHeader('nav.mainNav')}
              className="fixed top-0 inset-s-0 z-[9999] h-full w-[310px] max-w-[85vw] bg-white dark:bg-[#120610] text-foreground border-e border-border/50 shadow-2xl flex flex-col md:hidden animate-in slide-in-from-start duration-300 ease-out"
            >
              {/* ── 1. Drawer Header ───────────────────────────── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/40 bg-muted/20 shrink-0">
                <Link
                  href="/"
                  onClick={close}
                  className="flex items-center gap-2 group"
                >
                  <Image
                    src="/Logo.svg"
                    alt="Rose"
                    width={36}
                    height={34}
                    className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                  <span className="font-bold text-base tracking-wide text-foreground">
                    Rose
                  </span>
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={tHeader('nav.close')}
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── 2. User Card / Sign-in Banner ─────────────── */}
              <div className="p-4 border-b border-border/40 bg-gradient-to-br from-soft-pink-500/10 via-transparent to-maroon-900/10 dark:from-maroon-950/40 dark:to-transparent shrink-0">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-maroon-600 to-soft-pink-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                      {session?.user?.firstName?.[0]?.toUpperCase() ||
                        'U'}
                    </div>
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="text-xs text-muted-foreground">
                        {tHeader('hello')}
                      </p>
                      <p className="text-sm font-bold text-foreground truncate">
                        {session?.user?.firstName}{' '}
                        {session?.user?.lastName || ''}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-maroon-700 dark:text-soft-pink-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{tHeader('headerLogin')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Sign in to track orders, save favorites & enjoy
                      exclusive offers.
                    </p>
                    <Link
                      href="/login"
                      onClick={close}
                      className="w-full bg-gradient-to-r from-maroon-700 to-soft-pink-600 hover:from-maroon-600 hover:to-soft-pink-500 text-white font-semibold text-xs py-2 px-4 rounded-full text-center shadow-xs transition-all flex items-center justify-center gap-1.5 mt-1"
                    >
                      <span>{tHeader('headerLogin')}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                )}
              </div>

              {/* ── 3. Quick Search Bar ────────────────────────── */}
              <form
                onSubmit={handleSearchSubmit}
                className="px-4 py-3 border-b border-border/40 shrink-0"
              >
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-muted-foreground absolute start-3 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={tHeader('searchPlaceholder')}
                    className="w-full h-9 ps-9 pe-3 text-xs rounded-full border border-border/50 bg-muted/40 focus:bg-background focus:border-maroon-500 focus:outline-none focus:ring-1 focus:ring-maroon-500/30 transition-all placeholder:text-muted-foreground/70"
                  />
                </div>
              </form>

              {/* ── 4. Scrollable Nav Links ───────────────────── */}
              <div className="flex-1 overflow-y-auto py-3 space-y-4">
                {/* Main Navigation */}
                <div>
                  <div className="px-5 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {tHeader('nav.mainNav')}
                  </div>
                  <ul className="mt-1 space-y-0.5" role="list">
                    {NAV_LINKS.map(({ href, label, Icon }) => {
                      const isActive = pathname === href;
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={close}
                            aria-current={
                              isActive ? 'page' : undefined
                            }
                            className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-maroon-700 to-soft-pink-600 text-white font-semibold shadow-xs'
                                : 'text-foreground/80 hover:bg-muted/70 hover:text-foreground'
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${
                                isActive
                                  ? 'text-soft-pink-200'
                                  : 'text-muted-foreground'
                              }`}
                            />
                            <span>
                              {tHeader(`subHeader.${label}`)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* User Account Links (if authenticated) */}
                {isAuthenticated && (
                  <div className="pt-2 border-t border-border/40">
                    <div className="px-5 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {tUserMenu('account')}
                    </div>
                    <ul className="mt-1 space-y-0.5" role="list">
                      <li>
                        <Link
                          href="/account-setting"
                          onClick={close}
                          className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            pathname === '/account-setting'
                              ? 'bg-gradient-to-r from-maroon-700 to-soft-pink-600 text-white font-semibold shadow-xs'
                              : 'text-foreground/80 hover:bg-muted/70 hover:text-foreground'
                          }`}
                        >
                          <UserIcon className="w-4 h-4 text-muted-foreground" />
                          <span>{tUserMenu('account')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/orders"
                          onClick={close}
                          className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                            pathname === '/orders'
                              ? 'bg-gradient-to-r from-maroon-700 to-soft-pink-600 text-white font-semibold shadow-xs'
                              : 'text-foreground/80 hover:bg-muted/70 hover:text-foreground'
                          }`}
                        >
                          <ScrollText className="w-4 h-4 text-muted-foreground" />
                          <span>{tUserMenu('orders')}</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/account-setting"
                          onClick={close}
                          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-medium text-foreground/80 hover:bg-muted/70 hover:text-foreground transition-all"
                        >
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{tUserMenu('addresses')}</span>
                        </Link>
                      </li>
                      {session?.user?.role === 'ADMIN' && (
                        <li>
                          <Link
                            href="/dashboard"
                            onClick={close}
                            className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                              pathname === '/dashboard'
                                ? 'bg-gradient-to-r from-maroon-700 to-soft-pink-600 text-white font-semibold shadow-xs'
                                : 'text-foreground/80 hover:bg-muted/70 hover:text-foreground'
                            }`}
                          >
                            <Settings className="w-4 h-4 text-muted-foreground" />
                            <span>{tUserMenu('dashboard')}</span>
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            close();
                            signOut({ callbackUrl: '/' });
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-xs sm:text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-start"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{tUserMenu('logout')}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* ── 5. Drawer Footer (Language, Theme & Info) ─── */}
              <div className="px-5 py-4 border-t border-border/40 bg-muted/20 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-2.5">
                  <LangToggle className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors" />
                  <ThemeToggle />
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Rose © 2026
                </span>
              </div>
            </nav>
          </>,
          document.body
        )
      : null;

  return (
    <>
      {/* ── Hamburger Trigger Button ─────────────────────── */}
      <button
        ref={triggerRef}
        id="mobile-menu-trigger"
        type="button"
        aria-label={
          open ? tHeader('nav.close') : tHeader('nav.openMenu')
        }
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-foreground/85 hover:text-foreground hover:bg-muted/80 transition-colors shrink-0"
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Render Portal to body */}
      {drawerContent}
    </>
  );
}
