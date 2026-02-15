export interface Event {
  id: string
  name: string
  category: string
  type: 'In-Person' | 'Virtual' | 'Hybrid'
  date: string
  location: string
  image: string
  featured?: boolean
  organizer: string
  description?: string
  time?: string
}

export type EventData = Event

