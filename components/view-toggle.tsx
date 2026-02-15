'use client'

import { Grid3x3, List, Calendar } from 'lucide-react'

export type ViewType = 'grid' | 'list' | 'calendar'

interface ViewToggleProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  const views: { type: ViewType; icon: typeof Grid3x3; label: string }[] = [
    { type: 'grid', icon: Grid3x3, label: 'Grid' },
    { type: 'list', icon: List, label: 'List' },
    { type: 'calendar', icon: Calendar, label: 'Calendar' },
  ]

  return (
    <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg border border-border">
      {views.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onViewChange(type)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            currentView === type
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}
