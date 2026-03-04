'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { type TaskItem } from '@/app/(dashboard)/projects/actions';

// --- Types ---

type SortKey = 'title' | 'status' | 'priority' | 'assignee' | 'dueDate' | 'description';

interface TaskTableProps {
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
}

// --- Constants ---

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  'todo':        { label: 'To Do',       className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'done':        { label: 'Done',        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

const PRIORITY_BADGE: Record<string, { label: string; className: string }> = {
  high:   { label: 'High',   className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  low:    { label: 'Low',    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

const STATUS_RANK: Record<string, number> = { todo: 0, 'in-progress': 1, done: 2 };
const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

// --- Helpers ---

function formatDate(iso: string | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function compareTasks(a: TaskItem, b: TaskItem, key: SortKey, dir: 'asc' | 'desc'): number {
  const flip = dir === 'desc' ? -1 : 1;

  const aVal = a[key];
  const bVal = b[key];

  // Nulls always last regardless of direction
  if (aVal == null && bVal == null) return 0;
  if (aVal == null) return 1;
  if (bVal == null) return -1;

  let result = 0;

  if (key === 'status') {
    result = (STATUS_RANK[aVal as string] ?? 0) - (STATUS_RANK[bVal as string] ?? 0);
  } else if (key === 'priority') {
    result = (PRIORITY_RANK[aVal as string] ?? 99) - (PRIORITY_RANK[bVal as string] ?? 99);
  } else if (key === 'dueDate') {
    result = new Date(aVal as string).getTime() - new Date(bVal as string).getTime();
  } else {
    result = (aVal as string).localeCompare(bVal as string);
  }

  return result * flip;
}

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  if (!active) return <ArrowUpDown className='h-3.5 w-3.5 shrink-0' />;
  return dir === 'asc'
    ? <ArrowUp className='h-3.5 w-3.5 shrink-0' />
    : <ArrowDown className='h-3.5 w-3.5 shrink-0' />;
}

// --- Component ---

export default function TaskTable({ tasks, onTaskClick }: TaskTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  function handleHeaderClick(key: SortKey) {
    if (key !== sortKey) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
    }
  }

  const sortedTasks = useMemo(() => {
    if (!sortKey) return tasks;
    return [...tasks].sort((a, b) => compareTasks(a, b, sortKey, sortDir));
  }, [tasks, sortKey, sortDir]);

  const columns: { key: SortKey; label: string; width?: string }[] = [
    { key: 'title',       label: 'Title',       width: 'w-[30%]' },
    { key: 'status',      label: 'Status',      width: 'w-[10%]' },
    { key: 'priority',    label: 'Priority',    width: 'w-[10%]' },
    { key: 'assignee',    label: 'Assignee',    width: 'w-[15%]' },
    { key: 'dueDate',     label: 'Due Date',    width: 'w-[15%]' },
    { key: 'description', label: 'Description' },
  ];

  if (tasks.length === 0) {
    return (
      <div className='flex items-center justify-center py-16 text-sm text-muted-foreground'>
        No tasks yet
      </div>
    );
  }

  return (
    <div className='rounded-lg border border-border overflow-hidden'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='bg-muted/50'>
            {columns.map(({ key, label, width }) => {
              const isActive = sortKey === key;
              return (
                <th
                  key={key}
                  className={`text-left font-medium px-4 py-3 cursor-pointer select-none ${width ?? ''} ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                  onClick={() => handleHeaderClick(key)}
                >
                  <span className='inline-flex items-center gap-1'>
                    {label}
                    <SortIcon active={isActive} dir={sortDir} />
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className='divide-y divide-border'>
          {sortedTasks.map((task) => {
            const statusBadge = STATUS_BADGE[task.status];
            const priorityBadge = task.priority ? PRIORITY_BADGE[task.priority] : null;

            return (
              <tr
                key={task.id}
                onClick={() => onTaskClick(task)}
                className='cursor-pointer hover:bg-muted/50 transition-colors'
              >
                <td className='px-4 py-3 font-medium truncate max-w-0'>
                  <span className='block truncate'>{task.title}</span>
                </td>
                <td className='px-4 py-3'>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge.className}`}>
                    {statusBadge.label}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  {priorityBadge ? (
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge.className}`}>
                      {priorityBadge.label}
                    </span>
                  ) : (
                    <span className='text-muted-foreground'>—</span>
                  )}
                </td>
                <td className='px-4 py-3 text-muted-foreground'>
                  {task.assignee ?? '—'}
                </td>
                <td className='px-4 py-3 text-muted-foreground'>
                  {formatDate(task.dueDate)}
                </td>
                <td className='px-4 py-3 text-muted-foreground max-w-0'>
                  <span className='block truncate'>{task.description ?? '—'}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
