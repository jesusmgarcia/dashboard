import { notFound, redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth/session";
import { connectDB } from "@/app/lib/db/mongoose";
import Project from "@/app/lib/models/Project";
import { getTasksByProject } from "@/app/(dashboard)/projects/actions";
import { FolderOpen } from "lucide-react";
import ProjectTabs from "./ProjectTabs";

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

  const tasks = await getTasksByProject(id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <FolderOpen className="h-7 w-7 text-muted-foreground" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{project.name as string}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Created {createdAt}</p>
        </div>
      </div>

      <ProjectTabs projectId={id} initialTasks={tasks} />
    </div>
  );
}
