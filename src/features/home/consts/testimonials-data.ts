import { StaticImageData } from 'next/image';

import avatar1 from '@/shared/assets/images/Testominail(1).webp';
import avatar2 from '@/shared/assets/images/Testominail(2).webp';
import avatar3 from '@/shared/assets/images/Testominail(3).webp';

export type Testimonial = {
  id: number;
  name: string;
  avatar: StaticImageData;
  rating: number;
  text: string;
  date: string;
};

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Jake Miller',
    avatar: avatar1,
    rating: 5,
    text: "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    date: 'January 12, 2025',
  },
  {
    id: 2,
    name: 'Tyler Brooks',
    avatar: avatar2,
    rating: 4,
    text: "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    date: 'January 12, 2025',
  },
  {
    id: 3,
    name: 'Max Turner',
    avatar: avatar3,
    rating: 3,
    text: 'The team truly cares about every order. I always feel confident when I buy flowers from here. The checkout process was sup...',
    date: 'January 12, 2025',
  },
];
