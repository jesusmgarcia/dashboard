"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/app/components/ui/card";
import { Plus } from "lucide-react";
import { type GroupedTasks, type TaskItem, updateTaskStatus } from "@/app/(dashboard)/projects/actions";
import { type TaskStatus } from "@/app/lib/models/Task";
import AddTaskForm from "./AddTaskForm";

const COLUMNS: { status: TaskStatus; label: string; allowAdd: boolean }[] = [
  { status: "todo", label: "To Do", allowAdd: true },
  { status: "in-progress", label: "In Progress", allowAdd: true },
  { status: "done", label: "Done", allowAdd: false },
];

interface KanbanBoardProps {
  projectId: string;
  tasks: GroupedTasks;
}

export default function KanbanBoard({ projectId, tasks }: KanbanBoardProps) {
  const [columnTasks, setColumnTasks] = useState<GroupedTasks>({
    todo: tasks.todo,
    "in-progress": tasks["in-progress"],
    done: tasks.done,
  });
  const [, startTransition] = useTransition();

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const targetStatus = over.id as TaskStatus;

    // Find which column the task currently lives in
    const sourceStatus = (Object.keys(columnTasks) as TaskStatus[]).find((col) =>
      columnTasks[col].some((t) => t.id === taskId)
    );
    if (!sourceStatus || sourceStatus === targetStatus) return;

    const task = columnTasks[sourceStatus].find((t) => t.id === taskId)!;
    const prevState = columnTasks;

    // Optimistic update
    setColumnTasks((prev) => ({
      ...prev,
      [sourceStatus]: prev[sourceStatus].filter((t) => t.id !== taskId),
      [targetStatus]: [...prev[targetStatus], { ...task, status: targetStatus }],
    }));

    startTransition(async () => {
      const result = await updateTaskStatus(taskId, targetStatus);
      if (!result) {
        // Roll back on failure
        setColumnTasks(prevState);
      }
    });
  }

  function handleAdded(status: TaskStatus, task: TaskItem) {
    setColumnTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], task],
    }));
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map(({ status, label, allowAdd }) => (
          <Column
            key={status}
            label={label}
            tasks={columnTasks[status]}
            allowAdd={allowAdd}
            projectId={projectId}
            status={status}
            onAdded={(task) => handleAdded(status, task)}
          />
        ))}
      </div>
    </DndContext>
  );
}

interface ColumnProps {
  label: string;
  tasks: TaskItem[];
  allowAdd: boolean;
  projectId: string;
  status: TaskStatus;
  onAdded: (task: TaskItem) => void;
}

function Column({ label, tasks, allowAdd, projectId, status, onAdded }: ColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 min-h-24 rounded-lg p-2 transition-colors ${
          isOver ? "bg-primary/10 ring-1 ring-primary/30" : "bg-muted/40"
        }`}
      >
        {tasks.length === 0 && !showForm ? (
          <p className="text-xs text-muted-foreground text-center mt-4">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
        {allowAdd && (
          showForm ? (
            <AddTaskForm
              projectId={projectId}
              status={status}
              onAdded={(task) => {
                onAdded(task);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1 mt-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add task
            </button>
          )
        )}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: TaskItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="shadow-none">
        <CardContent className="px-3 py-2">
          <p className="text-sm">{task.title}</p>
        </CardContent>
      </Card>
    </div>
  );
}
