import { BentoBox, BentoBoxItem } from "@/components/BentoBox";
import { FancyTitle } from "@/components/fancy-title";
import { HeroSection } from "@/components/hero-section";
import { BestSellersSection } from "@/components/products/best-sellers-section";
import { HotDealsSection } from "@/components/products/hot-deals-section";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionDecor } from "@/components/ui/section-decor";
import { listProductsByCollection } from "@/lib/client";
import { permanentRedirect } from "next/navigation";

export default async function Home() {
  // return permanentRedirect("/home");

  const products = await listProductsByCollection({
    collectionId: "best-selling",
    limit: 8,
  });

  return (
    <>
      <HeroSection />
      <BentoBox className="max-w-[1280px] mx-auto">
        <BentoBoxItem className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
          <h2 className="text-2xl font-bold">Featured Product</h2>
        </BentoBoxItem>
        <BentoBoxItem>
          <h2 className="text-xl font-bold">New Arrivals</h2>
        </BentoBoxItem>
        <BentoBoxItem>
          <h2 className="text-xl font-bold">On Sale</h2>
        </BentoBoxItem>
      </BentoBox>

      {/* <TopSalesSection /> */}

      <div className="bg-gray-100 pt-14 pb-5">
        <section className="max-w-[1280px] mx-auto px-5 pt-5">
          <h2 className="flex items-center uppercase text-3xl font-bold">
            <SectionDecor />
            <FancyTitle>Popular Product</FancyTitle>
          </h2>
        </section>

        <main>
          <div className="mx-auto max-w-7xl pt-5 px-2 md:px-6 flex-grow">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
              <ProductGrid products={products ?? []} />
            </section>
          </div>

          <HotDealsSection products={products ?? []} />

          <BestSellersSection />
        </main>
      </div>
    </>
  );
}
