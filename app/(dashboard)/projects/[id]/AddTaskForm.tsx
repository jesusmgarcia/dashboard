"use client";

import { useRef, useState, useTransition } from "react";
import { createTask, type TaskItem } from "@/app/(dashboard)/projects/actions";
import { type TaskStatus } from "@/app/lib/models/Task";
import { Plus, X } from "lucide-react";

interface AddTaskFormProps {
  projectId: string;
  status: TaskStatus;
  onAdded: (task: TaskItem) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ projectId, status, onAdded, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;

    startTransition(async () => {
      const task = await createTask(projectId, trimmed, status);
      if (task) {
        onAdded(task);
        setTitle("");
      }
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onCancel();
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      <input
        ref={inputRef}
        autoFocus
        type="text"
        maxLength={200}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        placeholder="Task title…"
        className="flex-1 min-w-0 rounded-md border border-border bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={isPending || !title.trim()}
        className="shrink-0 rounded-md bg-primary p-1 text-primary-foreground disabled:opacity-40 hover:opacity-90"
        aria-label="Add task"
      >
        <Plus className="h-4 w-4" />
      </button>
      <button
        onClick={onCancel}
        disabled={isPending}
        className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground disabled:opacity-40"
        aria-label="Cancel"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
