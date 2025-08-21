import React from 'react';
import { cn } from '@/lib/utils';

const BentoBox = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4 my-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoBoxItem = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-gray-100 dark:bg-zinc-900 rounded-xl p-6 shadow-md flex justify-center items-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { BentoBox, BentoBoxItem };
