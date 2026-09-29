'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Menu, ScrollText, User, X } from 'lucide-react';

import HeaderSearch from '../../search/components/header-search';
import { NAV_LINKS } from '../consts/nav-links.constant';

// Returns the drawer link className based on active state
function drawerLinkClass(isActive: boolean): string {
  return [
    'flex items-center gap-3 px-5 py-3.5 text-base capitalize transition-colors',
    isActive
      ? 'text-bg-primary-saturated font-semibold bg-bg-subtle border-s-2 border-bg-primary-saturated'
      : 'text-text-plain hover:bg-bg-subtle hover:text-text-primary',
  ].join(' ');
}

export default function MobileNav() {
  const tHeader = useTranslations('header');
  const tUserMenu = useTranslations('userMenu');
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [open, setOpen] = useState(false);

  // Refs
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Functions
  const close = useCallback(() => {
    setOpen(false);
    // Return focus to trigger when drawer closes
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  // Effects

  // Focus close button and trap focus when drawer opens
  useEffect(() => {
    if (!open) {
      return;
    }

    // Focus the close button as soon as the drawer is open
    closeButtonRef.current?.focus();

    const drawer = drawerRef.current;
    if (!drawer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusable = Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.closest('[inert]'));

        if (focusable.length === 0) return;

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
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        ref={triggerRef}
        id="mobile-menu-trigger"
        aria-label={
          open ? tHeader('nav.close') : tHeader('nav.openMenu')
        }
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-text-plain hover:bg-bg-subtle transition-colors shrink-0"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Drawer — inert removes it from tab order, pointer events, and AT when closed */}
      <nav
        ref={drawerRef}
        id="mobile-menu"
        role="navigation"
        aria-label={tHeader('nav.mainNav')}
        inert={!open || undefined}
        className={`
          fixed top-0 inset-s-0 z-50 h-full w-72 max-w-[85vw]
          bg-bg-muted shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-in-out md:hidden
          ${open ? 'translate-x-0 rtl:translate-x-0' : '-translate-x-full rtl:translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-muted">
          <span className="font-bold text-text-plain text-lg">
            {tHeader('nav.menu')}
          </span>
          <button
            ref={closeButtonRef}
            aria-label={tHeader('nav.close')}
            onClick={close}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-bg-subtle transition-colors text-text-plain"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Bar inside Drawer */}
        <div className="px-4 pt-4 pb-2 border-b border-border-muted">
          <HeaderSearch />
        </div>

        {/* Nav links */}
        <ul
          className="flex flex-col py-4 overflow-y-auto flex-1"
          role="list"
        >
          {NAV_LINKS.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  aria-current={isActive ? 'page' : undefined}
                  className={drawerLinkClass(isActive)}
                >
                  <Icon className="w-5 h-5" />
                  {tHeader(`subHeader.${label}`)}
                </Link>
              </li>
            );
          })}

          {/* Divider */}
          <li className="my-2 border-t border-border-muted" />

          {/* Profile or Login item depending on auth token/session */}
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  href="/account"
                  onClick={close}
                  className={drawerLinkClass(pathname === '/account')}
                >
                  <User className="w-5 h-5 text-text-primary" />
                  <span>
                    {session?.user?.firstName || tUserMenu('account')}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  onClick={close}
                  className={drawerLinkClass(pathname === '/orders')}
                >
                  <ScrollText className="w-5 h-5 text-text-primary" />
                  <span>{tUserMenu('orders')}</span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    signOut({ callbackUrl: '/' });
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-base capitalize transition-colors text-text-danger hover:bg-bg-subtle font-medium text-start"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{tUserMenu('logout')}</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
                onClick={close}
                aria-current={
                  pathname === '/login' ? 'page' : undefined
                }
                className={drawerLinkClass(pathname === '/login')}
              >
                <User className="w-5 h-5" />
                <span>{tHeader('headerLogin')}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
