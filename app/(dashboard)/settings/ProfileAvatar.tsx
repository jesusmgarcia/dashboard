"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  fullName?: string | null;
  email: string;
}

function getInitials(fullName?: string | null, email?: string): string {
  if (fullName?.trim()) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  }
  return email?.[0]?.toUpperCase() ?? "?";
}

export default function ProfileAvatar({ fullName, email }: ProfileAvatarProps) {
  const initials = getInitials(fullName, email);

  return (
    <Avatar className="size-24 ring-4 ring-background shadow-lg">
      <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
