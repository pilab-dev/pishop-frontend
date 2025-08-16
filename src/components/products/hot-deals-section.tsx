// import { Product } from "@pilab/pishop-client";
import { Product } from "@/payload-types";
import { FC } from "react";
import { FancyTitle } from "../fancy-title";
import { SectionDecor } from "../ui/section-decor";
import ProductButtons from "./product-buttons";

type HotDealsSectionProps = {
  products: Product[];
};

export const HotDealsSection: FC<HotDealsSectionProps> = ({ products }) => {
  return (
    <div className="page-gray-800 pt-14 pb-5">
      <section className="max-w-[1280px] relative mx-auto px-5 py-5 h-[400px]">
        <div
          className="absolute -left-32 -top-32 -right-0 -bottom-5 oval-decor"
          style={{
            pointerEvents: "none",
          }}
        />
        <div className="absolute z-1 flex flex-col md:flex-row items-start justify-center gap-12">
          <div className="flex flex-row gap-10 justify-center center">
            <img
              src="/images/headphone.png"
              alt="Featured Products"
              className="h-[300px] w-[300px] bottom-0 object-contain"
            />

            <div className="flex flex-col justify-center gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  role="button"
                  key={i}
                  className="bg-white w-[70px] h-[70px] cursor-pointer shadow-xl rounded-sm"
                >
                  <img
                    src="/images/headphone.png"
                    alt="Featured Products"
                    className="object-contain w-full h-full p-1 hover:scale-125 hover:rotate-6 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start content-start gap-4 mt-6">
            <h2 className="flex items-center uppercase text-5xl font-bold">
              <SectionDecor />
              <FancyTitle>This week&apos;s Hot Deals</FancyTitle>
            </h2>

            <p>Video games are a big part of our lives.</p>

            <p className="font-bold">
              Beats Studio Wireless Over-Ear Black Headphones
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>32mm speakers, 1.2mm Cable</li>
              <li>32mm speakers, 1.2mm Cable</li>
              <li>32mm speakers, 1.2mm Cable</li>
              <li>32mm speakers, 1.2mm Cable</li>
            </ul>

            <span className="text-lg uppercase products-font">
              <span className="font-bold">Price: </span>
              <span className="text-primary font-bold">99.99$</span>
              <span className="line-through italic text-gray-400 ml-2">
                199.99$
              </span>
            </span>

            <ProductButtons
              show
              noWishlist
              noCompare
              handle={products.length > 0 ? (products[0].slug ?? "") : ""}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
