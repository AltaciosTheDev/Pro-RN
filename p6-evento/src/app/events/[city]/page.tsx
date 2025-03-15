import EventsList from '@/app/components/EventsList'
import H1 from '@/app/components/H1'
import { Evento } from '@/lib/types'
import React from 'react'

type Params = {
  city: string
}

type EventsPageProps = {
  params: Params
}

export default async function EventsPage({params}: EventsPageProps) {
  const {city} = params

  const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`)
  const events: Evento[] = await response.json()
  console.log(events)

  return (
    <main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
      <H1 className='mb-28'>
      {city === 'all' && "All Events"}
      {city !== 'all' && `Events in ${city.charAt(0).toUpperCase() + city.substring(1)}`} 
      </H1>
      <EventsList events={events}/>
    </main>
  )
}
