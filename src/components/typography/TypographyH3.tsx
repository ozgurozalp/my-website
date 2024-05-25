import { cn } from "@/lib/utils";
import React from "react";

interface TypographyH3Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH3({
  className,
  children,
  ...props
}: TypographyH3Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
