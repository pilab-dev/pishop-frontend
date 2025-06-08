import { FC } from "react";

type FancyTitleProps = {
  children: string;
  className?: string;
};

export const FancyTitle: FC<FancyTitleProps> = ({
  children,
  className = "text-primary",
}) => {
  const getFirstCharAndRest = (str: string) => {
    return [str[0], str.slice(1)];
  };

  const [firstChar, rest] = getFirstCharAndRest(children);

  return (
    <span className="whitespace-nowrap">
      <span className={className}>{firstChar}</span>
      {rest}
    </span>
  );
};
