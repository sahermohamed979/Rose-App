import { AboutHero } from '../components/about-hero';
import { AboutStats } from '../components/about-stats';
import { AboutStory } from '../components/about-story';
import { AboutValues } from '../components/about-values';
import { AboutProcess } from '../components/about-process';
import { AboutCta } from '../components/about-cta';

export function AboutScreen() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16">
      {/* Hero */}
      <AboutHero />

      {/* Stats Counter */}
      <AboutStats />

      {/* Story Narrative */}
      <AboutStory />

      {/* Core Values */}
      <AboutValues />

      {/* Step by step Process */}
      <AboutProcess />

      {/* Call to Action */}
      <AboutCta />
    </div>
  );
}
