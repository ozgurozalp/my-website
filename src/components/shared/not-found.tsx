import { cn } from "@/lib/utils";

interface NotFoundProps {
  category?: string;
  type?: "single" | "multiple";
  className?: string;
}
export default function NotFound({
  category,
  type = "multiple",
  className,
}: NotFoundProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="uppercase border-2 border-[--brand] rounded-3xl w-fit mx-auto p-6 sm:p-8 text-center sm:text-[1.875rem]">
        {type === "multiple" && (
          <h1>
            No blogs found in{" "}
            {category ? `category '${category}'` : "this website"}
          </h1>
        )}
        {type === "single" && (
          <div>
            <h1 className={"text-6xl font-mono"}>404</h1>
            <h2>Blog Not Found</h2>
            <p>The page you are looking for does not exist.</p>
          </div>
        )}
      </div>
    </div>
  );
}
