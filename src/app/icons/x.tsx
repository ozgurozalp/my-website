import { SVGProps } from "react";
import { cn } from "@/lib/utils";

export default function X({ height, width, className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height={height ?? 16}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={width ?? 16}
      className={cn("fill-current", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
        fill="currentColor"
      />
    </svg>
  );
}
