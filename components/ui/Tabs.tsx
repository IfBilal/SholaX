"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultId?: string;
  className?: string;
}

export default function Tabs({ items, defaultId, className }: TabsProps) {
  const [activeId, setActiveId] = useState<string>(defaultId ?? items[0]?.id ?? "");
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className={cn("space-y-4", className)}>
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-(--border-subtle) pb-2">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition",
                active
                  ? "border border-accent/40 bg-accent-muted text-primary"
                  : "text-tertiary hover:bg-(--overlay-hover) hover:text-primary",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem ? (
        <div id={`panel-${activeItem.id}`} role="tabpanel" aria-labelledby={`tab-${activeItem.id}`}>
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
