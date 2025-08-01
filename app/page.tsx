import { FancyTitle } from "@/components/fancy-title";
import { HeroSection } from "@/components/hero-section";
import { BestSellersSection } from "@/components/products/best-sellers-section";
import { HotDealsSection } from "@/components/products/hot-deals-section";
import { ProductGrid } from "@/components/products/product-grid";
import { TopSalesSection } from "@/components/products/top-sales-seection";
import { SectionDecor } from "@/components/ui/section-decor";
import { productsApi } from "@/lib/client";

export default async function Home() {
  const response = await productsApi.listProducts({
    collectionId: "best-selling",
    limit: 8,
  });

  return (
    <>
      <HeroSection />

      <TopSalesSection />

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
              <ProductGrid products={response.products ?? []} />
            </section>
          </div>

          <HotDealsSection products={response.products ?? []} />

          <BestSellersSection />
        </main>
      </div>
    </>
  );
}
