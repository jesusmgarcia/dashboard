'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { type GroupedTasks, type TaskItem } from '@/app/(dashboard)/projects/actions';
import { type TaskStatus } from '@/app/lib/models/Task';
import KanbanBoard from './KanbanBoard';
import TaskTable from './TaskTable';
import { TaskDetailDrawer } from './TaskDetailDrawer';

interface ProjectTabsProps {
  projectId: string;
  initialTasks: GroupedTasks;
}

export default function ProjectTabs({ projectId, initialTasks }: ProjectTabsProps) {
  const [columnTasks, setColumnTasks] = useState<GroupedTasks>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  const flatTasks = (Object.values(columnTasks) as TaskItem[][]).flat();

  function handleTasksChange(newTasks: GroupedTasks) {
    setColumnTasks(newTasks);
  }

  function handleTaskAdded(status: TaskStatus, task: TaskItem) {
    setColumnTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], task],
    }));
  }

  function handleTaskSaved(updated: TaskItem) {
    setColumnTasks((prev) => {
      const newState = { ...prev };
      for (const status of Object.keys(newState) as TaskStatus[]) {
        newState[status] = newState[status].map((t) =>
          t.id === updated.id ? { ...t, ...updated } : t,
        );
      }
      return newState;
    });
    setSelectedTask(null);
  }

  function handleTaskDeleted(taskId: string) {
    setColumnTasks((prev) => {
      const newState = { ...prev };
      for (const status of Object.keys(newState) as TaskStatus[]) {
        newState[status] = newState[status].filter((t) => t.id !== taskId);
      }
      return newState;
    });
    setSelectedTask(null);
  }

  return (
    <>
      <Tabs defaultValue='kanban'>
        <TabsList className='mb-4'>
          <TabsTrigger value='kanban'>Kanban</TabsTrigger>
          <TabsTrigger value='table'>Table</TabsTrigger>
        </TabsList>

        <TabsContent value='kanban'>
          <KanbanBoard
            projectId={projectId}
            tasks={columnTasks}
            onTaskClick={setSelectedTask}
            onTasksChange={handleTasksChange}
            onTaskAdded={handleTaskAdded}
          />
        </TabsContent>

        <TabsContent value='table'>
          <TaskTable tasks={flatTasks} onTaskClick={setSelectedTask} />
        </TabsContent>
      </Tabs>

      <TaskDetailDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSaved={handleTaskSaved}
        onDeleted={handleTaskDeleted}
      />
    </>
  );
}
