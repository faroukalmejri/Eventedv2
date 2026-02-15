'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import type { EventData } from '@/lib/types'

// Fallback mock data in case API fails or for initial hardcoded events
const FALLBACK_EVENTS: Record<string, EventData> = {
  '1': {
    id: '1',
    name: 'National Engineering Congress 2026',
    category: 'Engineering',
    type: 'In-Person',
    location: 'Cité des Sciences, Tunis',
    date: '2026-03-12',
    time: '09:00 AM',
    image: '/images/event-congress.jpg',
    featured: true,
    organizer: 'Tunisian Engineering Association',
    description: 'Join us for the largest engineering conference in North Africa featuring keynote speakers, workshops, and networking opportunities. This event brings together thousands of engineering professionals and students to share knowledge, innovations, and career opportunities.',
  },
  '2': {
    id: '2',
    name: 'Tunisian Startup Weekend: Student Edition',
    category: 'Startups',
    type: 'In-Person',
    location: 'The Dot, Tunis',
    date: '2026-03-28',
    time: '08:00 AM',
    image: '/images/event-startup.jpg',
    featured: true,
    organizer: 'Tunisia Startup Hub',
    description: 'A 54-hour event where student entrepreneurs pitch ideas, form teams, and build startups from scratch. Connect with mentors, investors, and fellow entrepreneurs while developing your business idea into a minimum viable product.',
  },
  '3': {
    id: '3',
    name: 'AI & Data Science Online Workshop',
    category: 'Technology',
    type: 'Virtual',
    location: 'Online',
    date: '2026-04-05',
    time: '02:00 PM',
    image: '/images/event-ai-workshop.jpg',
    featured: false,
    organizer: 'AI Tunisia Community',
    description: 'Learn the fundamentals of artificial intelligence and data science from industry experts in this interactive workshop. Suitable for beginners and intermediate learners interested in exploring AI and machine learning concepts.',
  },
  '4': {
    id: '4',
    name: 'Annual Spring Club Fair',
    category: 'Networking',
    type: 'In-Person',
    location: 'IHEC Carthage',
    date: '2026-04-15',
    time: '10:00 AM',
    image: '/images/event-club-fair.jpg',
    featured: false,
    organizer: 'IHEC Student Services',
    description: 'Discover and join various student clubs and organizations at IHEC Carthage. Meet club leaders, learn about their activities, and find your community on campus.',
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<EventData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      try {
        // Try fetching from API first
        const response = await fetch('/api/events')
        if (response.ok) {
          const events = await response.json()
          const foundEvent = events.find((e: EventData) => e.id === eventId)
          if (foundEvent) {
            setEvent(foundEvent)
            setLoading(false)
            return
          }
        }
      } catch (error) {
        console.error('[v0] Error fetching event:', error)
      }
      
      // Fallback to hardcoded events
      setEvent(FALLBACK_EVENTS[eventId] || null)
      setLoading(false)
    }
    
    fetchEvent()
  }, [eventId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader onOpenAdmin={() => {}} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-muted-foreground">Loading event...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader onOpenAdmin={() => {}} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to events
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
          </div>
        </main>
      </div>
    )
  }

  const typeColor = {
    'Virtual': 'bg-purple-500/20 text-purple-300',
    'In-Person': 'bg-green-500/20 text-green-300',
    'Hybrid': 'bg-yellow-500/20 text-yellow-300',
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onOpenAdmin={() => {}} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to events
        </Link>

        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden border border-border/50">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-3 flex-1">
                <h1 className="text-4xl font-bold text-foreground">{event.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColor[event.type as keyof typeof typeColor]}`}>
                    {event.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/50 text-foreground">
                    {event.category}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => alert('Registration button clicked! (placeholder)')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-fit"
              >
                Register Now
              </Button>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-card/50 border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="text-foreground font-medium">{event.date} at {event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Organizer</h3>
                <p className="text-foreground font-medium text-lg mb-3">{event.organizer}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Organized by {event.organizer}. For more information about this event, reach out to the organizer.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">About This Event</h3>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Registration Section */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Ready to attend?</h3>
              <p className="text-foreground/80 mb-6">Register now to secure your spot at this exciting event!</p>
              <Button
                onClick={() => alert('Registration button clicked! (placeholder)')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
