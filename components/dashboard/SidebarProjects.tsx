"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY_PROJECTS = "sidebar-projects";
const STORAGE_KEY_OPEN = "sidebar-projects-open";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function SidebarProjects() {
  const [isOpen, setIsOpen] = useState<boolean>(() =>
    readStorage(STORAGE_KEY_OPEN, true)
  );
  const [projects, setProjects] = useState<string[]>(() =>
    readStorage(STORAGE_KEY_PROJECTS, [])
  );
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OPEN, JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

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
    if (name) {
      setProjects((prev) => [...prev, name]);
    }
    setIsAdding(false);
    setInputValue("");
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
          className={cn(
            "flex items-center justify-center size-5 rounded",
            "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            "transition-colors"
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
              {projects.map((name, i) => (
                <li key={i}>
                  <span
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-sm",
                      "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                      "rounded-md mx-1 cursor-default transition-colors"
                    )}
                  >
                    <FolderOpen className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40" />
                    {name}
                  </span>
                </li>
              ))}
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
