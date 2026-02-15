"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Event } from "@/lib/types"

interface AdminDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: Omit<Event, "id">) => void
}

export function AdminDrawer({ open, onOpenChange, onAddEvent }: AdminDrawerProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [description, setDescription] = useState("")
  const [eventType, setEventType] = useState<"In-Person" | "Virtual" | "Hybrid">("In-Person")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name || !category || !organizer || !location || !date) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    const newEvent: Omit<Event, "id"> = {
      name,
      category,
      organizer,
      location,
      date,
      time,
      type: eventType,
      image: imageUrl || "/images/event-congress.jpg",
      description,
      featured: false,
    }

    try {
      // Add to Supabase
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('[v0] API error response:', responseData)
        setError(responseData.error || 'Failed to add event')
        setIsSubmitting(false)
        return
      }

      console.log('[v0] Event added to Supabase successfully')
    } catch (err) {
      console.error('[v0] Error adding event:', err)
      setError('An error occurred while adding the event')
      setIsSubmitting(false)
      return
    }

    // Also add to local state for immediate UI update
    onAddEvent(newEvent)

    // Reset form
    setName("")
    setCategory("")
    setOrganizer("")
    setLocation("")
    setDate("")
    setTime("")
    setImageUrl("")
    setDescription("")
    setEventType("In-Person")
    setError(null)
    onOpenChange(false)
    setIsSubmitting(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-md overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-foreground">Add New Event</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Fill in the details below to create a new event.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 pb-8">
          {error && (
            <div className="bg-destructive/20 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Event Name
            </Label>
            <Input
              id="name"
              placeholder="Event title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
              className="border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="organizer" className="text-sm font-medium text-foreground">
              Organizer
            </Label>
            <Input
              id="organizer"
              placeholder="Organization or team name"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              required
              disabled={isSubmitting}
              className="border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category" className="text-sm font-medium text-foreground">
              Category
            </Label>
            <Input
              id="category"
              placeholder="e.g. Engineering, Technology, Startups"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={isSubmitting}
              className="border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location" className="text-sm font-medium text-foreground">
              Location
            </Label>
            <Input
              id="location"
              placeholder="Venue or platform"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={isSubmitting}
              className="border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="date" className="text-sm font-medium text-foreground">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                disabled={isSubmitting}
                className="border-border/50 bg-secondary text-foreground focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="time" className="text-sm font-medium text-foreground">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={isSubmitting}
                className="border-border/50 bg-secondary text-foreground focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <textarea
              id="description"
              placeholder="Event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={isSubmitting}
              className="border border-border/50 bg-secondary text-foreground rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="eventType" className="text-sm font-medium text-foreground">
              Event Type
            </Label>
            <Select
              value={eventType}
              onValueChange={(val) => setEventType(val as "In-Person" | "Virtual" | "Hybrid")}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="eventType"
                className="border-border/50 bg-secondary text-foreground"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border/50 bg-card text-foreground">
                <SelectItem value="In-Person">In-Person</SelectItem>
                <SelectItem value="Virtual">Virtual</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="imageUrl" className="text-sm font-medium text-foreground">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isSubmitting}
              className="border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Event"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
