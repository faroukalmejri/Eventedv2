import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Direct Supabase client for API routes
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bsrtmlvdgjpqgpujydkn.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzcnRtbHZkZ2pwcWdwdWp5ZGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNjgzOTMsImV4cCI6MjA4NjY0NDM5M30.oNlPwuKkrJ8mzM1ZNxfRtT5u-vdMut-Amr34Ur_zC9Q'
  
  return createClient(supabaseUrl, supabaseKey)
}

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      console.error('[v0] Supabase GET error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(events)
  } catch (err) {
    console.error('[v0] GET handler error:', err)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    console.log('[v0] Adding event to Supabase:', body)

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          name: body.name,
          category: body.category,
          type: body.type,
          date: body.date,
          time: body.time,
          location: body.location,
          image: body.image,
          featured: body.featured || false,
          organizer: body.organizer,
          description: body.description,
        },
      ])
      .select()

    if (error) {
      console.error('[v0] Supabase POST error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('[v0] Event added successfully:', data)
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[v0] POST handler error:', err)
    return NextResponse.json({ error: 'Failed to add event' }, { status: 500 })
  }
}
