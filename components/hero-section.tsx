"use client"

import { useState, useEffect } from 'react'

export function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [countryIndex, setCountryIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const countries = ['Tunisia', 'Algeria', 'Morocco']
  
  useEffect(() => {
    const currentCountry = countries[countryIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentCountry.length) {
          setDisplayText(currentCountry.slice(0, displayText.length + 1))
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          // Move to next country
          setIsDeleting(false)
          setCountryIndex((countryIndex + 1) % countries.length)
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, countryIndex])

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="animate-fade-up">
          <span className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm">
            Student Events Platform
          </span>
        </div>
        <h1
          className="animate-fade-up mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "100ms" }}
        >
          The Pulse of Student Life{" "}
          <span className="text-primary">
            in {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          Discover, Join, and Lead.
        </p>
      </div>
    </section>
  )
}
