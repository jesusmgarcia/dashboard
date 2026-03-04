"use client";

import { useState, useEffect } from "react";
import { X, Calendar, User, AlignLeft, Flag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/app/components/ui/sheet";
import {
  type TaskItem,
  type TaskPatch,
  updateTask,
} from "@/app/(dashboard)/projects/actions";
import { type TaskPriority, type TaskStatus } from "@/app/lib/models/Task";

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const PRIORITY_OPTIONS: { value: TaskPriority; label: string; className: string }[] = [
  { value: "high", label: "High", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  { value: "medium", label: "Medium", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  { value: "low", label: "Low", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
];

interface TaskDetailDrawerProps {
  task: TaskItem | null;
  onClose: () => void;
  onSaved: (task: TaskItem) => void;
}

export function TaskDetailDrawer({ task, onClose, onSaved }: TaskDetailDrawerProps) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setAssignee(task.assignee ?? "");
      setDueDate(task.dueDate ?? "");
      setPriority(task.priority ?? "");
      setDescription(task.description ?? "");
      setError("");
    }
  }, [task]);

  async function handleClose() {
    if (!task) {
      onClose();
      return;
    }
    setSaving(true);
    setError("");

    const patch: TaskPatch = {
      title: title.trim() || task.title,
      assignee,
      dueDate,
      priority: priority || undefined,
      description,
    };

    const updated = await updateTask(task.id, patch);
    setSaving(false);

    if (!updated) {
      setError("Failed to save. Please try again.");
      return;
    }

    onSaved(updated);
    onClose();
  }

  return (
    <Sheet open={!!task} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent side="right" showCloseButton={false} className="w-full sm:max-w-md flex flex-col gap-0 p-0">
        <SheetTitle className="sr-only">{task?.title ?? "Task details"}</SheetTitle>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          {task && (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[task.status]}`}
            >
              {STATUS_LABELS[task.status]}
            </span>
          )}
          <button
            onClick={handleClose}
            disabled={saving}
            className="ml-auto rounded-sm opacity-70 hover:opacity-100 transition-opacity disabled:opacity-40"
            aria-label="Close drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          {/* Task name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Task name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
              placeholder="Task name"
            />
          </div>

          {/* Assignee */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Assignee
            </label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
              placeholder="Unassigned"
            />
          </div>

          {/* Due date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Flag className="h-3.5 w-3.5" />
              Priority
            </label>
            <div className="flex gap-2 flex-wrap">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(priority === opt.value ? "" : opt.value)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ring-2 ${
                    priority === opt.value
                      ? `${opt.className} ring-current`
                      : `${opt.className} ring-transparent opacity-60 hover:opacity-100`
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <AlignLeft className="h-3.5 w-3.5" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background resize-none"
              placeholder="Add a description…"
            />
          </div>
        </div>

        {/* Saving indicator */}
        {saving && (
          <div className="px-6 py-3 border-t shrink-0 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Saving…
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
