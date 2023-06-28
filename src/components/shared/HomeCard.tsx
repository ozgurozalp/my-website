import { ReactNode } from "react";

type HomeCardProps = {
  children: ReactNode;
};

export default function HomeCard({ children }: HomeCardProps) {
  return (
    <section className="w-full sm:w-[390px] bg-background flex flex-col gap-8 justify-center">
      {children}
    </section>
  );
}
