'use client';

import { useTransition } from 'react';
import { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragEndEvent,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/app/components/ui/card';
import { Plus } from 'lucide-react';
import {
  type GroupedTasks,
  type TaskItem,
  updateTaskStatus,
} from '@/app/(dashboard)/projects/actions';
import { type TaskStatus } from '@/app/lib/models/Task';
import AddTaskForm from './AddTaskForm';

const COLUMNS: { status: TaskStatus; label: string; allowAdd: boolean }[] = [
  { status: 'todo', label: 'To Do', allowAdd: true },
  { status: 'in-progress', label: 'In Progress', allowAdd: true },
  { status: 'done', label: 'Done', allowAdd: false },
];

interface KanbanBoardProps {
  projectId: string;
  tasks: GroupedTasks;
  onTaskClick: (task: TaskItem) => void;
  onTasksChange: (newTasks: GroupedTasks) => void;
  onTaskAdded: (status: TaskStatus, task: TaskItem) => void;
}

export default function KanbanBoard({
  projectId,
  tasks,
  onTaskClick,
  onTasksChange,
  onTaskAdded,
}: KanbanBoardProps) {
  const [, startTransition] = useTransition();

  // distance: 4 prevents very short pointer movements from starting a drag,
  // allowing click events to fire normally for opening the drawer.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const targetStatus = over.id as TaskStatus;

    const sourceStatus = (Object.keys(tasks) as TaskStatus[]).find((col) =>
      tasks[col].some((t) => t.id === taskId),
    );
    if (!sourceStatus || sourceStatus === targetStatus) return;

    const task = tasks[sourceStatus].find((t) => t.id === taskId)!;
    const prevState = tasks;

    const optimistic: GroupedTasks = {
      ...tasks,
      [sourceStatus]: tasks[sourceStatus].filter((t) => t.id !== taskId),
      [targetStatus]: [...tasks[targetStatus], { ...task, status: targetStatus }],
    };
    onTasksChange(optimistic);

    startTransition(async () => {
      const result = await updateTaskStatus(taskId, targetStatus);
      if (!result) {
        onTasksChange(prevState);
      }
    });
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {COLUMNS.map(({ status, label, allowAdd }) => (
          <Column
            key={status}
            label={label}
            tasks={tasks[status]}
            allowAdd={allowAdd}
            projectId={projectId}
            status={status}
            onAdded={(task) => onTaskAdded(status, task)}
            onSelectTask={onTaskClick}
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
  onSelectTask: (task: TaskItem) => void;
}

function Column({ label, tasks, allowAdd, projectId, status, onAdded, onSelectTask }: ColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between px-1 mb-1'>
        <span className='text-sm font-semibold text-foreground'>{label}</span>
        <span className='text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5'>
          {tasks.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 min-h-24 rounded-lg p-2 transition-colors ${
          isOver ? 'bg-primary/10 ring-1 ring-primary/30' : 'bg-muted/40'
        }`}
      >
        {tasks.length === 0 && !showForm ? (
          <p className='text-xs text-muted-foreground text-center mt-4'>No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} onSelect={onSelectTask} />)
        )}
        {allowAdd &&
          (showForm ? (
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
              className='flex items-center gap-1 mt-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
            >
              <Plus className='h-3.5 w-3.5' />
              Add task
            </button>
          ))}
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: TaskItem;
  onSelect: (task: TaskItem) => void;
}

const PRIORITY_BADGE: Record<string, { label: string; className: string }> = {
  high:   { label: 'High',   className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  low:    { label: 'Low',    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

function TaskCard({ task, onSelect }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const badge = task.priority ? PRIORITY_BADGE[task.priority] : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(task)}
    >
      <Card className='shadow-none py-2'>
        <CardContent className='px-3 py-2'>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-sm truncate'>{task.title}</p>
            {badge && (
              <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                {badge.label}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
