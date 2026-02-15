"use client"

import { Calendar, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { EventData } from "@/lib/types"

interface EventCardProps {
  event: EventData
  index: number
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <article
        className="animate-fade-up group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 cursor-pointer h-full"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute left-3 top-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                event.type === "Virtual"
                  ? "bg-[hsl(270,60%,50%)]/90 text-[hsl(0,0%,100%)]"
                  : event.type === "Hybrid"
                  ? "bg-[hsl(40,90%,50%)]/90 text-[hsl(220,20%,4%)]"
                  : "bg-[hsl(150,60%,40%)]/90 text-[hsl(0,0%,100%)]"
              }`}
            >
              {event.type}
            </span>
          </div>

          {/* Featured */}
          {event.featured && (
            <div className="absolute right-3 top-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(40,90%,50%)]/90 px-2.5 py-1 text-xs font-semibold text-[hsl(220,20%,4%)]">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <h3 className="text-balance text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {event.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-1">
            {event.organizer}
          </p>

          <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0 text-primary/70" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
