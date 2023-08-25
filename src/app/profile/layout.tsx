import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function ProfileLayout(props: Props) {
  return <div className="h-[100dvh] bg-background">{props.children}</div>;
}
