import FlowerDivider from "./FlowerDivider";

interface OrnamentalDividerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function OrnamentalDivider({ className = "", size = "md" }: OrnamentalDividerProps) {
  return <FlowerDivider className={className} size={size} />;
}
