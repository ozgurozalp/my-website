import { cn } from "@/lib/utils";
import React from "react";

interface TypographyH4Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH4({
  className,
  children,
  ...props
}: TypographyH4Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight text-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
