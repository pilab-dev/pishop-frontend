import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/utilities/ui";
import Link from "next/link";
import React from "react";

import type { Page, Post } from "@/payload-types";

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: "pages" | "posts" | "products";
    value: Page | Post | string | number;
  } | null;
  size?: ButtonProps["size"] | null;
  type?: "custom" | "reference" | null;
  url?: string | null;
};

const generateHref = (
  type: string | null | undefined,
  reference: CMSLinkType["reference"],
  url: string | null | undefined,
): string | null => {
  if (
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
  ) {
    const { relationTo, value } = reference;

    if (relationTo === "products") {
      return `/products/${value.slug}`;
    }

    if (relationTo === "pages") {
      return `/${value.slug}`;
    }

    return `/${relationTo}/${value.slug}`;
  }

  return url || null;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props;

  const href = generateHref(type, reference, url);

  if (!href) return null;

  const size = appearance === "link" ? "clear" : sizeFromProps;
  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  );
};
