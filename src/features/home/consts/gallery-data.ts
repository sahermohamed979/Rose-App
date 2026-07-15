import { StaticImageData } from 'next/image';

import gallery1 from '@/shared/assets/images/gallery1.png';
import gallery2 from '@/shared/assets/images/gallery2.png';
import gallery3 from '@/shared/assets/images/gallery3.png';
import gallery4 from '@/shared/assets/images/gallery4.png';
import gallery5 from '@/shared/assets/images/gallery5.png';
import gallery6 from '@/shared/assets/images/gallery6.png';

export type GalleryImage = {
  id: number;
  src: StaticImageData;
  alt: string;
  height: number;
};

const galleryColumns: GalleryImage[][] = [
  // First column
  [
    {
      id: 1,
      src: gallery1,
      alt: 'Wedding and Birthday Gifts',
      height: 600,
    },
    {
      id: 2,
      src: gallery2,
      alt: 'Heart Shaped Chocolates',
      height: 400,
    },
  ],
  // Second column
  [
    {
      id: 3,
      src: gallery3,
      alt: 'Red Gift Boxes with Rings',
      height: 430,
    },
    {
      id: 4,
      src: gallery4,
      alt: 'Ring with Flowers',
      height: 570,
    },
  ],
  // Third column
  [
    {
      id: 5,
      src: gallery5,
      alt: 'Ring in Box with White Flowers',
      height: 430,
    },
    {
      id: 6,
      src: gallery6,
      alt: 'Engagement Card',
      height: 570,
    },
  ],
];

export default galleryColumns;
