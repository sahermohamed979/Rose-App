import { StaticImageData } from 'next/image';

import brand1 from '@/shared/assets/images/Partener(1).png';
import brand2 from '@/shared/assets/images/Partener(2).png';
import brand3 from '@/shared/assets/images/Partener(3).png';
import brand4 from '@/shared/assets/images/Partener(4).png';
import brand5 from '@/shared/assets/images/Partener(5).png';
import brand6 from '@/shared/assets/images/Partener(6).png';

export type BrandLogo = {
  id: number;
  src: StaticImageData;
  alt: string;
};

export const brandsData: BrandLogo[] = [
  { id: 1, src: brand1, alt: 'Coconut Cosmetics' },
  { id: 2, src: brand2, alt: 'Ginyard' },
  { id: 3, src: brand3, alt: 'Ingoude Company' },
  { id: 4, src: brand4, alt: 'Velvet Cosmetics' },
  { id: 5, src: brand5, alt: 'Ingoude Company' },
  { id: 6, src: brand6, alt: 'Habus Furniture' },
];
