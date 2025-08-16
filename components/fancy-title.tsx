import { cn } from "@/lib/utils";
import { FC } from "react";

type FancyTitleProps = {
  children: string;
  className?: string;
};

export const FancyTitle: FC<FancyTitleProps> = ({ children, className }) => {
  const getFirstCharAndRest = (str: string) => {
    return [str[0], str.slice(1)];
  };

  const [firstChar, rest] = getFirstCharAndRest(children);

  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className={cn("text-primary", className)}>{firstChar}</span>
      {rest}
    </span>
  );
};
