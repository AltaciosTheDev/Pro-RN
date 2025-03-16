import EventsList from '@/app/components/EventsList'
import H1 from '@/app/components/H1'
import React, { Suspense } from 'react'
import LoadingCity from './loading'
import { Metadata } from 'next'
import { capitalize } from '@/lib/utils'


type Params = {
  city: string
}

type EventsPageProps = {
  params: Params
}

export function generateMetadata({params}: EventsPageProps): Metadata {
  const {city} = params

  return {
    title: `Events in ${capitalize(city)}`
  }
}

export default async function EventsPage({params}: EventsPageProps) {
  const {city} = params

  return (
    <main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
      <H1 className='mb-28'>
      {city === 'all' && "All Events"}
      {city !== 'all' && `Events in ${capitalize(city)}`} 
      </H1>

    <Suspense fallback={<LoadingCity/>}>
      <EventsList city={city}/>
    </Suspense>
    </main>
  )
}
