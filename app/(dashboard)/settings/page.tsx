import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  await connectDB();
  const user = await User.findById(session.id).select("createdAt email").lean();

  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-lg">
      <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      <p className="mt-1 mb-6 text-muted-foreground">Your profile information.</p>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
            <p className="mt-1 text-sm">{session.email}</p>
          </div>
          {createdAt && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Member since</p>
              <p className="mt-1 text-sm">{createdAt}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
