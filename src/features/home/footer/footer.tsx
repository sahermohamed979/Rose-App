import FooterLogo from './components/footer-logo';
import FooterNav from './components/footer-nav';
import FooterNewsletter from './components/footer-newsletter';

/**
 * Footer Component
 * Main footer section for the home page containing the brand logo,
 * navigation links, and the newsletter subscription form.
 */
export default function Footer() {
  // --- Render ---
  return (
    <footer className="w-full bg-bg-inverse py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Logo & Copyright */}
            <div className="flex justify-center lg:justify-start">
              <FooterLogo />
            </div>

            {/* Navigation Links */}
            <div className="flex justify-center lg:justify-start">
              <FooterNav />
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex justify-center lg:justify-end">
            <FooterNewsletter />
          </div>
        </div>
      </div>
    </footer>
  );
}
