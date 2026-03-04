'use client';

import { type TaskItem } from '@/app/(dashboard)/projects/actions';

interface TaskTableProps {
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
}

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

function formatDate(iso: string | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TaskTable({ tasks, onTaskClick }: TaskTableProps) {
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
          <tr className='bg-muted/50 text-muted-foreground'>
            <th className='text-left font-medium px-4 py-3 w-[30%]'>Title</th>
            <th className='text-left font-medium px-4 py-3 w-[10%]'>Status</th>
            <th className='text-left font-medium px-4 py-3 w-[10%]'>Priority</th>
            <th className='text-left font-medium px-4 py-3 w-[15%]'>Assignee</th>
            <th className='text-left font-medium px-4 py-3 w-[15%]'>Due Date</th>
            <th className='text-left font-medium px-4 py-3'>Description</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-border'>
          {tasks.map((task) => {
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
