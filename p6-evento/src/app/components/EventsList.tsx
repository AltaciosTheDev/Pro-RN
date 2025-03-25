import React from 'react'
import EventCard from './EventCard'
import PaginationControls from './pagination-controls'
import { getEvents } from '@/lib/server-utils'



type EventsListProps = {
  city: string
  page?: number
}

export default async function EventsList({city, page = 1}: EventsListProps) {
  
  const {events, itemsOnPage} = await getEvents(city, page) //server action 
  
  const previousPath = page > 1 ? `/events/${city}?page=${page-1}` : ""
  const nextPath =`/events/${city}/?page=${page+1}`
  console.log(events)
  console.log(itemsOnPage)
  
return <section className='max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]'>
    {events.map((event) => <EventCard key={event.id} event={event}/>)}
    <PaginationControls previousPath={previousPath} nextPath={nextPath} itemsOnPage={itemsOnPage}></PaginationControls>
    </section>


}
