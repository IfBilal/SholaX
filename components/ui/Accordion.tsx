"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("divide-y divide-(--border-subtle) rounded-2xl border border-(--border-subtle) bg-surface-1", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-primary"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn("h-4 w-4 text-tertiary transition-transform", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-relaxed text-secondary">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
