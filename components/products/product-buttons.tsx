"use client";

import { Tooltip } from "@heroui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
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

  return (
    <AnimatePresence>
      {show && (
        <div
          className="bottom-0 left-0 right-0
         flex flex-row gap-2 pb-5"
        >
          {!hideDetails && (
            <Tooltip content="View details" color="primary">
              <motion.a
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={whileHover}
                // disabled={noCompare}
                className="bg-gray-600 text-white p-3 drop-shadow rounded-full hover:bg-primary/90"
                transition={{ delay: 0, duration: 0.1 }}
                href={Boolean(handle) ? `/product/${handle}` : "#"}
                role="link"
              >
                <FaEye />
              </motion.a>
            </Tooltip>
          )}

          <Tooltip content="Compare" color="primary">
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={whileHover}
              disabled={noCompare}
              className="bg-blue-800 text-white p-3 drop-shadow rounded-full hover:bg-primary/90"
              transition={{ delay: 0.1, duration: 0.15 }} // 100ms delay
            >
              <FaArrowsAltH />
            </motion.button>
          </Tooltip>

          <Tooltip content="Add to wishlist" color="primary">
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={whileHover}
              disabled={noWishlist}
              className="bg-blue-800 text-white p-3 shadow-sm rounded-full hover:bg-primary/90"
              transition={{ delay: 0.2, duration: 0.2 }} // 100ms delay
            >
              <FaRegHeart />
            </motion.button>
          </Tooltip>

          <Tooltip
            content={<span className="whitespace-nowrap">Add to cart</span>}
            color="primary"
          >
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={whileHover}
              disabled={notForSale}
              className="bg-blue-800 text-white p-3 shadow-sm rounded-full hover:bg-primary/90"
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <FaCartPlus />
            </motion.button>
          </Tooltip>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductButtons;
