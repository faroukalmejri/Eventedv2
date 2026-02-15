"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SiteHeaderProps {
  onOpenAdmin: () => void
}

export function SiteHeader({ onOpenAdmin }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Evented.live
          </span>
        </div>

        <Button
          onClick={onOpenAdmin}
          size="sm"
          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Event</span>
        </Button>
      </div>
    </header>
  )
}
