import React from "react";

import { ProductGrid } from "@/components/products/product-grid";
import { FancyTitle } from "@/components/fancy-title";
import { SectionDecor } from "@/components/ui/section-decor";
import { Button } from "@/components/ui/button";
import type { ProductGridProps } from "@/payload-types";

type Props = ProductGridProps & {};

export const ProductGridBlock: React.FC<Props> = (props) => {
  const {
    title,
    subtitle,
    source,
    collection,
    products,
    displaySettings,
    callToAction,
    blockType
  } = props;

  // For now, we'll use mock data or need to implement data fetching logic
  // This is a placeholder - in a real implementation, you'd fetch products based on the source
  const mockProducts = [
    // Mock products would be fetched based on source configuration
  ];

  const productsToDisplay = products?.map(p => p.productId) || mockProducts;
  const view = displaySettings?.view || 'grid';
  const maxItems = displaySettings?.maxItems || 12;
  const showPrices = displaySettings?.showPrices !== false;
  const showButtons = displaySettings?.showButtons !== false;

  // Limit products based on maxItems
  const limitedProducts = productsToDisplay.slice(0, maxItems);

  return (
    <section className="py-8">
      <div className="max-w-[1280px] mx-auto px-5">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="flex items-center justify-center uppercase text-4xl font-bold mb-4">
                <SectionDecor />
                <FancyTitle label={title} />
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <div className="mb-8">
          <ProductGrid
            products={limitedProducts}
            view={view}
            variant="primary"
          />
        </div>

        {callToAction?.text && callToAction?.link && (
          <div className="text-center">
            <Button
              asChild
              variant={callToAction.style === 'secondary' ? 'secondary' :
                      callToAction.style === 'outline' ? 'outline' :
                      callToAction.style === 'link' ? 'link' : 'default'}
            >
              <a href={callToAction.link}>
                {callToAction.text}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
