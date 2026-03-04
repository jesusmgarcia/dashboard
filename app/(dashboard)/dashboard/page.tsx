import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/app/lib/auth/session";
import { connectDB } from "@/app/lib/db/mongoose";
import Project from "@/app/lib/models/Project";
import Task from "@/app/lib/models/Task";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getDashboardData(userId: string, email: string) {
  await connectDB();

  const [projectCount, lastProject, highPriorityTasks] = await Promise.all([
    Project.countDocuments({ userId }),
    Project.findOne({ userId }).sort({ createdAt: -1 }).lean(),
    Task.find({ assignee: email, priority: "high" })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
  ]);

  return { projectCount, lastProject, highPriorityTasks };
}

// ─── StatCard component ───────────────────────────────────────────────────────

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-bold tabular-nums">{value}</CardTitle>
      </CardHeader>
      {subtitle && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardContent>
      )}
    </Card>
  );
}

// ─── HighPriorityTasksCard component ─────────────────────────────────────────

function HighPriorityTasksCard({
  tasks,
}: {
  tasks: { _id: string; title: string; projectId: string }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>High Priority Tasks</CardDescription>
        <CardTitle>Assigned to you</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No high priority tasks</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li key={task._id.toString()}>
                <Link
                  href={`/projects/${task.projectId.toString()}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-destructive" />
                  <span className="truncate">{task.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const { projectCount, lastProject, highPriorityTasks } =
    await getDashboardData(session.id, session.email);

  const lastProjectSubtitle = lastProject
    ? `Created ${new Date(lastProject.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Projects" value={projectCount} />
        <StatCard
          title="Last Project"
          value={lastProject ? (lastProject.name as string) : "—"}
          subtitle={lastProjectSubtitle ?? "No projects yet"}
        />
        <StatCard
          title="High Priority Tasks"
          value={highPriorityTasks.length}
          subtitle="assigned to you"
        />
      </div>

      {/* High priority tasks full-width row */}
      <HighPriorityTasksCard
        tasks={highPriorityTasks.map((t) => ({
          _id: t._id.toString(),
          title: t.title,
          projectId: t.projectId.toString(),
        }))}
      />
    </div>
  );
}
