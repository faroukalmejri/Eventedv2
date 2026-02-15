-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('In-Person', 'Virtual', 'Hybrid')),
  date DATE NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  organizer TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to view events
CREATE POLICY "Allow anyone to view events" ON public.events FOR SELECT USING (true);

-- Create policy to allow anyone to insert events
CREATE POLICY "Allow anyone to insert events" ON public.events FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to update events
CREATE POLICY "Allow anyone to update events" ON public.events FOR UPDATE USING (true);

-- Create policy to allow anyone to delete events
CREATE POLICY "Allow anyone to delete events" ON public.events FOR DELETE USING (true);

-- Create an index on date for faster queries
CREATE INDEX idx_events_date ON public.events(date);
