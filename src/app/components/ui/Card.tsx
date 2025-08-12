import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-xl border border-black/10 bg-white shadow-sm">
      {children}
    </div>
  );
}


