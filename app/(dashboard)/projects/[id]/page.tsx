import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongoose";
import Project from "@/lib/models/Project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect("/");

  await connectDB();
  const project = await Project.findById(id).lean();

  if (!project || project.userId.toString() !== session.id) {
    notFound();
  }

  const createdAt = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <FolderOpen className="h-7 w-7 text-muted-foreground" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{project.name as string}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Created {createdAt}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Project Name
            </p>
            <p className="mt-1 text-sm">{project.name as string}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Project ID
            </p>
            <p className="mt-1 text-sm font-mono text-muted-foreground">{id}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Created
            </p>
            <p className="mt-1 text-sm">{createdAt}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
