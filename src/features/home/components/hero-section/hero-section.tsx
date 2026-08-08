import SidePromoCard from './side-promo-card';
import HeroCarousel from './carousel';
import PromoCards from './promo-cards';
import FeaturesStrip from '../features-section/features-section';

export default function HeroSection() {
  return (
    <div className="mt-10 px-20 ">
      {/* hero-section */}
      <div className="grid grid-cols-12  gap-6">
        <div className="col-span-3">
          <SidePromoCard />
        </div>
        <div className="col-span-9">
          <HeroCarousel />
        </div>
      </div>
      {/* hero-section/promo-cards */}
      <div className="mt-6.25">
        <PromoCards />
      </div>
      {/* features-section */}
      <div className="mt-10">
        <FeaturesStrip />
      </div>
    </div>
  );
}
