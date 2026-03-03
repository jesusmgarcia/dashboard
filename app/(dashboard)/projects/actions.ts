"use server";

import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongoose";
import Project from "@/lib/models/Project";

export async function createProject(
  name: string
): Promise<{ id: string; name: string } | null> {
  const session = await getSession();
  if (!session) return null;

  const trimmed = name.trim();
  if (!trimmed) return null;

  try {
    await connectDB();
    const project = await Project.create({ name: trimmed, userId: session.id });
    return { id: project._id.toString(), name: project.name };
  } catch {
    return null;
  }
}
