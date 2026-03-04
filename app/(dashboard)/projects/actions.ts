"use server";

import { getSession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/mongoose";
import Project from "@/lib/models/Project";
import Task, { type TaskStatus } from "@/lib/models/Task";

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

export type TaskItem = { id: string; title: string; status: TaskStatus };
export type GroupedTasks = Record<TaskStatus, TaskItem[]>;

export async function getTasksByProject(projectId: string): Promise<GroupedTasks> {
  const empty: GroupedTasks = { todo: [], "in-progress": [], done: [] };

  await connectDB();
  const tasks = await Task.find({ projectId }).lean();

  for (const task of tasks) {
    const item: TaskItem = { id: task._id.toString(), title: task.title, status: task.status };
    empty[task.status].push(item);
  }

  return empty;
}

export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus
): Promise<TaskItem | null> {
  const session = await getSession();
  if (!session) return null;

  try {
    await connectDB();
    const task = await Task.findById(taskId).lean();
    if (!task) return null;

    const project = await Project.findById(task.projectId).lean();
    if (!project || project.userId.toString() !== session.id) return null;

    const updated = await Task.findByIdAndUpdate(taskId, { status }, { new: true }).lean();
    if (!updated) return null;
    return { id: updated._id.toString(), title: updated.title, status: updated.status };
  } catch {
    return null;
  }
}

export async function createTask(
  projectId: string,
  title: string,
  status: TaskStatus
): Promise<TaskItem | null> {
  const session = await getSession();
  if (!session) return null;

  const trimmed = title.trim();
  if (!trimmed) return null;

  try {
    await connectDB();
    const project = await Project.findById(projectId).lean();
    if (!project || project.userId.toString() !== session.id) return null;

    const task = await Task.create({ title: trimmed, status, projectId });
    return { id: task._id.toString(), title: task.title, status: task.status };
  } catch {
    return null;
  }
}
