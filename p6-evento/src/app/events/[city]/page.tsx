import H1 from '@/app/components/H1'
import React from 'react'

type Params = {
  city: string
}

type EventsPageProps = {
  params: Params
}

export default function EventsPage({params}: EventsPageProps) {
  const {city} = params
  return (
    <main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
      {city === 'all' && <H1>All Events</H1>}
      {city !== 'all' && <H1>Events in {city.charAt(0).toUpperCase() + city.substring(1)}</H1>} 
    </main>
  )
}
