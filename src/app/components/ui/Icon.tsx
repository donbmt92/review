type Props = { name?: string; className?: string };

export default function Icon({ name = "dot", className = "w-5 h-5" }: Props) {
  return <span aria-hidden className={className}>•</span>;
}


