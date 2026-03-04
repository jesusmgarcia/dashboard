import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth/session";
import { connectDB } from "@/app/lib/db/mongoose";
import User from "@/app/lib/models/User";
import ProfileForm from "./ProfileForm";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  await connectDB();
  const user = await User.findById(session.id).select("email profile").lean();

  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="mt-1 text-muted-foreground">
            Manage your account profile and contact information.
          </p>
        </div>
        <ProfileForm
          data={{
            email: session.email,
            profile: (user as { profile?: Record<string, string> } | null)?.profile ?? {},
          }}
        />
      </div>
    </div>
  );
}
