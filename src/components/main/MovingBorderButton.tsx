import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/moving-border";
import clsx from "clsx";

export function MovingBorderButton({children,className,...props}:ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <Button
        {...props}
        borderRadius="1.75rem"
        className={clsx("bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800",className)}
      >
        {children}
      </Button>
    </div>
  );
}
