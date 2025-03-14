import { Evento } from '@/lib/types'
import React from 'react'
import EventCard from './EventCard'

type EventsListProps = {
    events: Evento[]
}

export default function EventsList({events}: EventsListProps) {
  return <section className='max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]'>
    {events.map((event) => <EventCard key={event.id} event={event}/>)}
    </section>
  
}
