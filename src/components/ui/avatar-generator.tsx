import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarStyle =
  | "avataaars"
  | "bottts"
  | "micah"
  | "personas"
  | "pixel-art"
  | "adventurer";

interface AvatarGeneratorProps {
  seed?: string;
  style?: AvatarStyle;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

export function AvatarGenerator({
  seed = "user",
  style = "avataaars",
  size = "md",
  fallback = "U",
  className = "",
}: AvatarGeneratorProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  const getAvatarUrl = () => {
    switch (style) {
      case "avataaars":
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
      case "bottts":
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
      case "micah":
        return `https://api.dicebear.com/7.x/micah/svg?seed=${seed}`;
      case "personas":
        return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;
      case "pixel-art":
        return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`;
      case "adventurer":
        return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
      default:
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    }
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={getAvatarUrl()} alt="Avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarGenerator;
