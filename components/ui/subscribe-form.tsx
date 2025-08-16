"use client";

import { createRef } from "react";
import { FancyTitle } from "../fancy-title";
import { Input } from "./input";

/**
 * Subscribe form
 */
export const SubscribeForm = () => {
  const ref = createRef<HTMLInputElement>();

  /**
   * Handle subscribe
   */
  const handleSubscribe = () => {
    console.log(ref.current?.value);
    ref.current?.focus();
  };

  return (
    <form className="w-full page-gray-950 text-white">
      <div className="mx-auto px-4 md:px-12 py-8 max-w-[1280px]">
        <div
          className="flex flex-col 
        lg:flex-row 
        gap-5 justify-center content-center"
        >
          <div className="font-medium uppercase my-auto">
            <span
              role="button"
              className="underline text-primary cursor-pointer"
              onClick={handleSubscribe}
            >
              Subscribe
            </span>{" "}
            to newsletter
          </div>
          <div className="my-auto">
            and receive{" "}
            <span className="italic">
              <FancyTitle>$20</FancyTitle>
            </span>{" "}
            coupon for first shopping
          </div>

          <div className="flex-1">
            <Input
              ref={ref}
              type="email"
              placeholder="Email address"
              className="border-2 transition-all duration-300 border-gray-600 px-3 py-2 w-full bg-gray-800 
                text-white active:border-primary active:outline-none 
                focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
