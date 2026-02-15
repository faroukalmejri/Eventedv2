'use client'

import { X } from 'lucide-react'

export interface FilterOptions {
  eventType: string[]
  location: string[]
  date: string
}

interface FilterPanelProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onClose?: () => void
}

const EVENT_TYPES = ['In-Person', 'Virtual', 'Hybrid']
const LOCATIONS = ['Tunis', 'Sfax', 'Sousse', 'Djerba', 'Kairouan', 'Online']

export function FilterPanel({
  filters,
  onFilterChange,
  onClose,
}: FilterPanelProps) {
  const handleEventTypeToggle = (type: string) => {
    const updated = filters.eventType.includes(type)
      ? filters.eventType.filter((t) => t !== type)
      : [...filters.eventType, type]
    onFilterChange({ ...filters, eventType: updated })
  }

  const handleLocationToggle = (location: string) => {
    const updated = filters.location.includes(location)
      ? filters.location.filter((l) => l !== location)
      : [...filters.location, location]
    onFilterChange({ ...filters, location: updated })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, date: e.target.value })
  }

  const hasActiveFilters =
    filters.eventType.length > 0 || filters.location.length > 0 || filters.date

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onFilterChange({ eventType: [], location: [], date: '' })
            }
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Event Type
          </label>
          <div className="mt-2 space-y-2">
            {EVENT_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.eventType.includes(type)}
                  onChange={() => handleEventTypeToggle(type)}
                  className="w-4 h-4 rounded border-border bg-secondary cursor-pointer"
                />
                <span className="text-sm text-foreground">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Location
          </label>
          <div className="mt-2 space-y-2">
            {LOCATIONS.map((location) => (
              <label
                key={location}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.location.includes(location)}
                  onChange={() => handleLocationToggle(location)}
                  className="w-4 h-4 rounded border-border bg-secondary cursor-pointer"
                />
                <span className="text-sm text-foreground">{location}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            From Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={handleDateChange}
            className="mt-2 w-full px-3 py-2 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
          />
        </div>
      </div>
    </div>
  )
}
