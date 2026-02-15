'use client'

import { Event } from '@/lib/types'
import { Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface EventListViewProps {
  events: Event[]
}

export function EventListView({ events }: EventListViewProps) {
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
    <div className="space-y-3">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <div
            className="flex gap-4 bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer"
          >
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground truncate">
                    {event.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {event.organizer}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                    event.type === "Virtual"
                      ? "bg-purple-500/20 text-purple-300"
                      : event.type === "Hybrid"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                >
                  {event.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span className="truncate">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
