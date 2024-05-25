import { cn } from "@/lib/utils";
import React from "react";

interface TypographyH1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH1({
  className,
  children,
  ...props
}: TypographyH1Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold text-balance tracking-tight lg:text-5xl text-gray-800 max-w-[35ch]",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
