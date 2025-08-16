"use client";

import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipProvider } from "@ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaArrowsAltH, FaCartPlus, FaEye, FaRegHeart } from "react-icons/fa";

type ProductButtonsProps = {
  show: boolean;
  notForSale?: boolean;
  noWishlist?: boolean;
  noCompare?: boolean;
  hideDetails?: boolean;
  handle: string;
};

export const ProductButtons: FC<ProductButtonsProps> = ({
  show = false,
  notForSale = false,
  noWishlist = false,
  noCompare = false,
  hideDetails = false,
  handle,
}) => {
  const router = useRouter();

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      // transition: { duration: 0.2, delay: 0 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  const whileHover = {
    scale: 1.3,
    transition: { duration: 0.2, delay: 0 },
  };

  const handleNavigateTo = (location?: string) => () => {
    if (!location) return;

    router.push(location);
  };

  return (
    <TooltipProvider>
      <AnimatePresence>
        {show && (
          <div className="bottom-0 left-0 right-0 flex flex-row gap-2 pb-5">
            {!hideDetails && (
              <Tooltip>
                <TooltipContent className="px-4 bg-primary rounded-sm">
                  View details
                </TooltipContent>

                <TooltipTrigger asChild>
                  <motion.button
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    role="link"
                    data-href={`/product/${handle}`}
                    onClick={handleNavigateTo(
                      Boolean(handle) ? `/product/${handle}` : undefined,
                    )}
                    transition={{ delay: 0, duration: 0.1 }}
                    variants={buttonVariants}
                    whileHover={whileHover}
                    // disabled={noCompare}
                    className="bg-gray-600 text-white p-3 drop-shadow rounded-full hover:bg-primary/90"
                  >
                    <FaEye />
                  </motion.button>
                </TooltipTrigger>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  animate="visible"
                  className="bg-blue-800 text-white p-3 drop-shadow rounded-full hover:bg-primary/90"
                  disabled={noCompare}
                  exit="hidden"
                  initial="hidden"
                  transition={{ delay: 0.1, duration: 0.15 }} // 100ms delay
                  variants={buttonVariants}
                  whileHover={whileHover}
                >
                  <FaArrowsAltH />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>Compare</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  animate="visible"
                  className="bg-blue-800 text-white p-3 shadow-sm rounded-full hover:bg-primary/90"
                  disabled={noWishlist}
                  exit="hidden"
                  initial="hidden"
                  transition={{ delay: 0.2, duration: 0.2 }} // 100ms delay
                  variants={buttonVariants}
                  whileHover={whileHover}
                >
                  <FaRegHeart />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>Add to wishlist</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  animate="visible"
                  className="bg-blue-800 text-white p-3 shadow-sm rounded-full hover:bg-primary/90"
                  disabled={notForSale}
                  exit="hidden"
                  initial="hidden"
                  transition={{ delay: 0.3, duration: 0.2 }}
                  variants={buttonVariants}
                  whileHover={whileHover}
                >
                  <FaCartPlus />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>Add to cart</TooltipContent>
            </Tooltip>
          </div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default ProductButtons;
