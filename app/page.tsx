"use client"

import { useState, useMemo, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { EventGrid } from "@/components/event-grid"
import { AdminDrawer } from "@/components/admin-drawer"
import { ViewToggle, type ViewType } from "@/components/view-toggle"
import { SearchBar } from "@/components/search-bar"
import { FilterPanel, type FilterOptions } from "@/components/filter-panel"
import { EventListView } from "@/components/event-list-view"
import { EventCalendarView } from "@/components/event-calendar-view"
import type { EventData } from "@/lib/types"

const INITIAL_EVENTS: EventData[] = [
  {
    id: "1",
    name: "National Engineering Congress 2026",
    category: "Engineering",
    type: "In-Person",
    location: "Cité des Sciences, Tunis",
    date: "2026-03-12",
    time: "09:00 AM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", // Engineering/Technology
    featured: true,
    organizer: "Tunisian Engineering Association",
    description: "Join us for the largest engineering conference in North Africa featuring keynote speakers, workshops, and networking opportunities.",
  },
  {
    id: "2",
    name: "Tunisian Startup Weekend: Student Edition",
    category: "Startups",
    type: "In-Person",
    location: "The Dot, Tunis",
    date: "2026-03-28",
    time: "08:00 AM",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop", // Startup/Business meeting
    featured: true,
    organizer: "Tunisia Startup Hub",
    description: "A 54-hour event where student entrepreneurs pitch ideas, form teams, and build startups from scratch.",
  },
  {
    id: "3",
    name: "AI & Data Science Online Workshop",
    category: "Technology",
    type: "Virtual",
    location: "Online",
    date: "2026-04-05",
    time: "02:00 PM",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop", // AI/Data Science
    featured: false,
    organizer: "AI Tunisia Community",
    description: "Learn the fundamentals of artificial intelligence and data science from industry experts in this interactive workshop.",
  },
  {
    id: "4",
    name: "Annual Spring Club Fair",
    category: "Networking",
    type: "In-Person",
    location: "IHEC Carthage",
    date: "2026-04-15",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop", // Networking/Event
    featured: false,
    organizer: "IHEC Student Services",
    description: "Discover and join various student clubs and organizations at IHEC Carthage.",
  },
]

export default function Home() {
  const [events, setEvents] = useState<EventData[]>(INITIAL_EVENTS)
  const [adminOpen, setAdminOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewType, setViewType] = useState<ViewType>("grid")
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    eventType: [],
    location: [],
    date: "",
  })

  // Fetch events from Supabase on mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)
        const response = await fetch('/api/events')
        if (response.ok) {
          const supabaseEvents = await response.json()
          console.log('[v0] Fetched events from Supabase:', supabaseEvents)
          // Convert UUID strings to strings for consistency
          const formattedEvents = supabaseEvents.map((event: any) => ({
            id: event.id,
            name: event.name,
            category: event.category,
            type: event.type,
            date: event.date,
            time: event.time,
            location: event.location,
            // Use Unsplash fallback if no image provided
            image: event.image || "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
            featured: event.featured,
            organizer: event.organizer,
            description: event.description,
          }))
          if (formattedEvents.length > 0) {
            console.log('[v0] Adding Supabase events to state')
            setEvents([...formattedEvents, ...INITIAL_EVENTS])
          }
        } else {
          console.log('[v0] No events in Supabase yet or fetch failed')
        }
      } catch (error) {
        console.error('[v0] Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        event.name.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      // Event type filter
      if (filters.eventType.length > 0) {
        if (!filters.eventType.includes(event.type)) return false
      }

      // Location filter - check if any selected location is in the event location
      if (filters.location.length > 0) {
        const locationMatch = filters.location.some((loc) =>
          event.location.toLowerCase().includes(loc.toLowerCase())
        )
        if (!locationMatch) return false
      }

      // Date filter
      if (filters.date) {
        const filterDate = filters.date
        if (event.date < filterDate) return false
      }

      return true
    })
  }, [events, searchQuery, filters])

  function handleAddEvent(event: Omit<EventData, "id">) {
    const newEvent: EventData = {
      ...event,
      id: Date.now().toString(),
    }
    setEvents((prev) => [newEvent, ...prev])
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <HeroSection />

        {/* Search and Filter Section */}
        <section className="bg-background border-b border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {/* Search Bar */}
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              {/* View Toggle and Filter */}
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <ViewToggle currentView={viewType} onViewChange={setViewType} />
                <button
                  onClick={() =>
                    setFilters({ eventType: [], location: [], date: "" })
                  }
                  className="text-sm text-primary hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </div>
            </aside>

            {/* Events Display */}
            <div className="lg:col-span-3">
              {viewType === "grid" && <EventGrid events={filteredEvents} />}
              {viewType === "list" && <EventListView events={filteredEvents} />}
              {viewType === "calendar" && (
                <EventCalendarView events={filteredEvents} />
              )}
            </div>
          </div>
        </section>
      </main>
      <AdminDrawer
        open={adminOpen}
        onOpenChange={setAdminOpen}
        onAddEvent={handleAddEvent}
      />
    </div>
  )
}
