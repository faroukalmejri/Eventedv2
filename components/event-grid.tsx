"use client"

import type { EventData } from "@/lib/types"
import { EventCard } from "@/components/event-card"

interface EventGridProps {
  events: EventData[]
}

export function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No events found
        </h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search or filters to find events that match your
          interests.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  )
}

