import { ArrowLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function PaymentMethod() {
  return (
    <div className=" p-7 w-195 ">
      <div className=" flex flex-row mb-6 gap-4 align-text-bottom  ">
        <button className="font-semibold bg-bg-muted flex flex-row justify-center items-center p-2 gap-1 rounded-md text-[14px] ">
          <ArrowLeft width={20} height={20} />
          Back
        </button>
        <h1 className="text-[30px] font-semibold">Payment Method</h1>
      </div>
      <div className=" flex flex-row gap-4 p-2.5 ">
        {/* cash */}
        <div className="border border-border-soft cursor-pointer rounded-md  hover:bg-bg-subtle p-4 gap-2.5 w-1/2 flex flex-col justify-center items-center">
          <Image
            src="/cash.svg"
            alt="pay on cash"
            width={195}
            height={195}
          />
          <h1 className="font-semibold text-[24px]">
            Cash on Delivery
          </h1>
          <p className="font-semibold text-[14px] text-text-default text-center">
            You’ll pay in cash when your order is delivered.
          </p>
        </div>
        {/* credit */}
        <div className="border border-border-soft cursor-pointer rounded-md  hover:bg-bg-subtle p-4 gap-2.5 w-1/2 flex flex-col justify-center items-center align-middle  ">
          <Image
            src="/credit.svg"
            alt="pay by credit card"
            width={195}
            height={195}
          />
          <h1 className="font-semibold text-[24px] ">Credit Card</h1>
          <p className="font-semibold text-[14px] text-text-default text-center ">
            You’ll be securely redirected to Stripe to complete your
            payment.
          </p>
        </div>
      </div>
      <div className="mt-3 border-t flex justify-end ">
        <button className="bg-bg-primary-saturated mt-3 px-4 py-2.5 gap-2.5 rounded-xl text-text-inverse  flex flex-row">
          Checkout <MoveRight />
        </button>
      </div>
    </div>
  );
}
