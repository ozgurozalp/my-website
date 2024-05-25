import { cn } from "@/lib/utils";
import React from "react";

interface TypographyPProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "default" | "muted" | "lead";
}

export function TypographyP({
  className,
  children,
  variant = "default",
  ...props
}: TypographyPProps) {
  return (
    <p
      className={cn(
        "text-pretty",
        variant === "default" && "text-base text-gray-600",
        variant === "muted" && "text-sm text-muted-foreground",
        variant === "lead" && "text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
