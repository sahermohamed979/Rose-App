import { ContactHero } from '../components/contact-hero';
import { ContactInfoCards } from '../components/contact-info-cards';
import { ContactForm } from '../components/contact-form';
import { ContactFaq } from '../components/contact-faq';
import { ContactMap } from '../components/contact-map';

export function ContactScreen() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Hero Header */}
      <ContactHero />

      {/* Info Cards */}
      <ContactInfoCards />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Boutique Map & FAQ Column */}
        <div className="lg:col-span-5 space-y-8">
          <ContactMap />
          <ContactFaq />
        </div>
      </div>
    </div>
  );
}
