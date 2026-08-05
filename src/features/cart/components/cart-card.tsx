import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Star, Trash } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import cartImage from '@/shared/assets/images/1.png';

export default function CartCard() {
  return (
    <>
      <div className=" relative  rounded-2xl  ">
        {/* {idle !== "idle" && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 rounded-2xl flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
              <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium text-gray-600">
                {action === "updating" ? "Updating..." : "Removing..."}
              </span>
            </div>
          </div>
        )} */}
        <div className="flex gap-4 ">
          <Link className="relative shrink-0 group" href={`/`}>
            <div className="w-32 h-35   rounded-xl   overflow-hidden">
              {true ? (
                <Image
                  src={cartImage}
                  alt={'cart image'}
                  fill
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>
          </Link>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex  justify-between w-full">
              <div>
                <Link className="group/title" href={`/`}>
                  <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                    samer
                  </h3>
                </Link>
                <span className="inline-flex items-center  text-xs font-medium rounded-full">
                  <Star className="text-yellow-500 fill-yellow-500 size-4" />{' '}
                  Rating: 4.5 (9 Rating)
                </span>
              </div>
              <div>
                <Button
                  className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                  title="Remove item"
                >
                  <Trash />
                  Remove
                </Button>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="mb-4">
                <span className="text-xs text-gray-400">(x1)</span>
                <span className=" ms-1 text-primary-600 font-bold text-lg me-2">
                  {100} EGP
                </span>
              </div>
              <div className="flex items-center ">
                <Button
                  size="lg"
                  className="rounded-lg  shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
                >
                  <Minus />
                </Button>
                <span className="w-12 text-center font-bold text-gray-900">
                  sa{' '}
                </span>
                <Button className=" rounded-lg py-10 px-16  shadow-sm flex items-center justify-center text-white hover:bg-primary-700 transition-all">
                  <Plus size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
