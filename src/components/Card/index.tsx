"use client";
import { Media } from "@/components/Media";
import type { Post } from "@/payload-types";
import { cn } from "@/utilities/ui";
import Link from "next/link";
import React from "react";

export type CardPostData = Pick<Post, "slug" | "categories" | "meta" | "title">;

export const Card: React.FC<{
  className?: string;
  doc?: CardPostData;
  relationTo?: "posts";
  showCategories?: boolean;
  title?: string;
}> = ({
  className,
  doc,
  relationTo,
  showCategories,
  title: titleFromProps,
}) => {
  const { slug, categories, meta, title } = doc || {};
  const { description, image: metaImage } = meta || {};

  const hasCategories = categories?.length || 0 > 0;
  const titleToUse = titleFromProps || title;
  const href = `/${relationTo}/${slug}`;

  return (
    <article
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-card",
        className,
      )}
    >
      <div className="relative w-full">
        {metaImage && typeof metaImage !== "string" ? (
          <Media resource={metaImage} size="33vw" />
        ) : (
          <div>No image</div>
        )}
      </div>

      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {categories?.map(
              (category, index) =>
                typeof category === "object" && (
                  <span key={index}>
                    {category.title || "Untitled category"}
                    {index < categories.length - 1 && ", "}
                  </span>
                ),
            )}
          </div>
        )}

        {titleToUse && (
          <div className="prose">
            <h3>
              <Link href={href}>{titleToUse}</Link>
            </h3>
          </div>
        )}

        {description && (
          <div className="mt-2">
            <p>{description.replace(/\s/g, " ")}</p>
          </div>
        )}
      </div>
    </article>
  );
};
