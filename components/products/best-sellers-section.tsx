"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { FancyTitle } from "../fancy-title";
import { SectionDecor } from "../ui/section-decor";
import ProductButtons from "./product-buttons";

type BestSellersSectionProps = {};

export const BestSellersSection: FC<
  PropsWithChildren<BestSellersSectionProps>
> = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState("top20");

  useEffect(() => {
    console.log("selectedKey->", selectedKey);
  }, [selectedKey]);

  return (
    <div className="bg-gray-100 pt-14 pb-5">
      <div className="max-w-[1280px] mx-auto px-5 py-5">
        <div className="flex flex-row justify-between gap-4 py-8 md:py-10">
          <h2 className="flex items-center uppercase text-4xl font-bold">
            <SectionDecor />
            <FancyTitle>Best Sellers</FancyTitle>
          </h2>

          <Tabs
            aria-label="Tabs variants"
            variant="underlined"
            color="primary"
            selectedKey={selectedKey}
            onSelectionChange={(e) => setSelectedKey(e as string)}
          >
            {["Top20", "Headphones", "Laptop & PC", "Smartphone", "Watch"].map(
              (tab) => (
                <Tab key={tab} title={tab} className="products-tab" />
              ),
            )}
          </Tabs>
        </div>

        <div className="grid grid-cols-4" style={{ gap: "2px" }}>
          {/* Featured item */}
          <div
            className="p-6 scaled-product-tile
              col-span-2 row-span-2 bg-white
              transition-all ease-in-out 
              "
          >
            <div className="flex flex-col gap-1 justify-center content-center h-full">
              <p className="text-blue-800 text-sm font-normal mb-1 text-center">
                Headphone
              </p>
              <h3 className="text-lg text-gray-600 font-bold mb-1 text-center products-font">
                SMS audio SMS-DS-YWL Street
              </h3>
              <p className="text-gray-600 text-center products-font uppercase">
                PRICE: <span className="font-bold text-primary">2 999</span> HUF
              </p>

              <div className="mx-auto p-16 flex-1 max-h-[570px]">
                <img
                  alt="Headphone"
                  title="Headphone"
                  src="/images/headphone.png"
                  className="h-full object-contain"
                />
              </div>

              <div className="mx-auto">
                <ProductButtons
                  show
                  hideDetails
                  handle="sms-audio-sms-ds-ywl-street"
                />
              </div>
            </div>
          </div>

          {/* 4 products */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6
          bg-white transition-all
            scaled-product-tile origin-bottom hover:z-50 hover:shadow-lg
            h-[400px]"
            >
              <div className="flex flex-col gap-1 justify-left h-full">
                <p className="text-blue-800 text-sm font-normal mb-1">
                  Headphone
                </p>
                <h3 className="text-base text-gray-600 font-bold mb-1 products-font">
                  SMS audio SMS-DS-YWL Street
                </h3>
                <p className="text-gray-600 products-font uppercase">
                  PRICE: <span className="font-bold text-primary">2 999</span>{" "}
                  HUF
                </p>

                <div className="mx-auto flex-1 p-8 max-h-[200px]">
                  <img
                    alt="Headphone"
                    title="Headphone"
                    src="/images/headphone.png"
                    className="h-full object-contain"
                  />
                </div>

                <p className="text-gray-600 products-font">
                  Product description lore ipsum lore ipsum lore ipsum lore
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
