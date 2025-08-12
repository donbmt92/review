import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-full px-4 h-10 text-sm font-medium transition-colors";
  const theme =
    variant === "primary"
      ? "bg-black text-white hover:bg-black/85"
      : "border border-black/10 bg-white hover:bg-black/[.03]";
  return <button className={`${base} ${theme} ${className}`} {...props} />;
}


