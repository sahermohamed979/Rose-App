import Image from 'next/image';
import notfoundImage from '@/shared/assets/images/notfound.webp';

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="md:h-90 h-64 md:w-177.5 w-64 md:mb-12 ">
        <Image
          src={notfoundImage}
          alt="Page not found"
          width={710}
          height={315}
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-2xl md:text-4xl font-semibold text-text-plain max-w-4xl">
        This page does not exist.
      </h1>

      <p className="text-sm md:text-xl text-text-muted text-center mt-1.5 mb-5 max-w-2xl">
        We couldn’t find the page you are looking for, please make
        sure you are on the right path.
      </p>
    </div>
  );
}
