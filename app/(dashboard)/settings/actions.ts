"use server";

import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";

export type ProfileFormState = {
  success: boolean;
  message: string;
} | null;

export async function updateProfile(
  _prev: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const session = await getSession();
  if (!session) return { success: false, message: "Not authenticated." };

  const email = (formData.get("email") as string | null)?.trim();

  const profile = {
    fullName: (formData.get("fullName") as string | null)?.trim() ?? "",
    phone: (formData.get("phone") as string | null)?.trim() ?? "",
    country: (formData.get("country") as string | null)?.trim() ?? "",
    state: (formData.get("state") as string | null)?.trim() ?? "",
    city: (formData.get("city") as string | null)?.trim() ?? "",
    address: (formData.get("address") as string | null)?.trim() ?? "",
    zip: (formData.get("zip") as string | null)?.trim() ?? "",
    role: (formData.get("role") as string | null)?.trim() ?? "",
  };

  try {
    await connectDB();

    const update: Record<string, unknown> = { $set: { profile } };
    if (email && email !== session.email) {
      (update.$set as Record<string, unknown>).email = email.toLowerCase();
    }

    await User.findByIdAndUpdate(session.id, update);

    return { success: true, message: "Profile updated successfully." };
  } catch {
    return { success: false, message: "Failed to update profile. Please try again." };
  }
}
