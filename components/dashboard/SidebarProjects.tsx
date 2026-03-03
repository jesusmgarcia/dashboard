"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { ChevronDown, ChevronRight, Plus, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createProject } from "@/app/(dashboard)/projects/actions";
import type { ProjectItem } from "./DashboardLayout";

const STORAGE_KEY_OPEN = "sidebar-projects-open";

function readOpenState(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OPEN);
    return raw !== null ? (JSON.parse(raw) as boolean) : true;
  } catch {
    return true;
  }
}

export function SidebarProjects({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(() => readOpenState());
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OPEN, JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  function startAdding() {
    setIsOpen(true);
    setInputValue("");
    setIsAdding(true);
  }

  function commitInput() {
    const name = inputValue.trim();
    setIsAdding(false);
    setInputValue("");
    if (!name) return;

    startTransition(async () => {
      const result = await createProject(name);
      if (result) {
        setProjects((prev) => [...prev, result]);
        router.push(`/projects/${result.id}`);
      }
    });
  }

  function cancelInput() {
    setIsAdding(false);
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitInput();
    } else if (e.key === "Escape") {
      cancelInput();
    }
  }

  return (
    <div className="pt-2 border-t border-sidebar-border">
      {/* Section header */}
      <div className="flex items-center gap-1 px-3 py-2">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-1 items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          )}
          Projects
        </button>

        {/* Add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            startAdding();
          }}
          disabled={isPending}
          className={cn(
            "flex items-center justify-center size-5 rounded",
            "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            "transition-colors disabled:opacity-40"
          )}
          aria-label="Add project"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Collapsible body */}
      {isOpen && (
        <div className="pb-2">
          {/* Inline input */}
          {isAdding && (
            <div className="flex items-center gap-2 px-3 py-1.5">
              <FolderOpen className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40" />
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={commitInput}
                placeholder="Project name…"
                className={cn(
                  "flex-1 min-w-0 bg-transparent text-sm text-sidebar-foreground",
                  "placeholder:text-sidebar-foreground/40",
                  "outline-none border-b border-sidebar-border focus:border-sidebar-foreground/40",
                  "transition-colors pb-0.5"
                )}
              />
            </div>
          )}

          {/* Project list */}
          {projects.length > 0 ? (
            <ul>
              {projects.map((project) => {
                const href = `/projects/${project.id}`;
                const isActive = pathname === href;
                return (
                  <li key={project.id}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md mx-1 transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <FolderOpen className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40" />
                      {project.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            !isAdding && (
              <p className="px-6 py-1 text-xs text-sidebar-foreground/40">
                No projects yet
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
