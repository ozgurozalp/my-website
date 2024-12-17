import NotFound from "@/components/shared/not-found";

export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "calc(100vh - 5rem)",
      }}
      className="h-dvh flex items-center justify-center"
    >
      <NotFound type="single" />
    </div>
  );
}
