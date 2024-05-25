import { cn } from "@/lib/utils";
import React from "react";

interface TypographyH2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH2({
  className,
  children,
  ...props
}: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
