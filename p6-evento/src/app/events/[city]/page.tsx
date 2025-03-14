import H1 from '@/app/components/H1'
import React from 'react'

// {
//   id: 19,
//   name: 'Dance Fusion Festival',
//   slug: 'dance-fusion-festival',
//   city: 'Austin',
//   location: 'Austin Street Dance Studio',
//   date: '2030-11-28T00:00:00.000Z',
//   organizerName: 'Rhythm Revolution',
//   imageUrl: 'https://images.unsplash.com/photo-1642178225043-f299072af862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=100',
//   description: 'Experience a blend of dance styles from around the world. Participate in dance workshops, watch electrifying performances, and dance the night away.'
// }

type Params = {
  city: string
}

type EventsPageProps = {
  params: Params
}

export default async function EventsPage({params}: EventsPageProps) {
  const {city} = params

  const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`)
  const events = await response.json()
  console.log(events)

  return (
    <main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
      {city === 'all' && <H1>All Events</H1>}
      {city !== 'all' && <H1>Events in {city.charAt(0).toUpperCase() + city.substring(1)}</H1>} 

      {events.map((event) => <section key={event.id}>{event.name}</section>)}
    </main>
  )
}
