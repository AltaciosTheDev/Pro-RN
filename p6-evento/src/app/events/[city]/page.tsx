import EventsList from '@/app/components/EventsList'
import H1 from '@/app/components/H1'
import React, { Suspense } from 'react'
import LoadingCity from './loading'
import { Metadata } from 'next'
import { capitalize } from '@/lib/utils'
import { z } from 'zod'


type Params = {
  city: string
}

type Props = {
  params: Params
}

type SearchParams = {
  searchParams: {[key: string]: string | string[] | undefined }
}

type EventsPageProps = Props & SearchParams

export function generateMetadata({params}: Props): Metadata {
  const {city} = params

  return {
    title: `Events in ${capitalize(city)}`
  }
}

const pageNumberSchema = z.coerce.number().int().positive().optional()

export default async function EventsPage({params, searchParams}: EventsPageProps) {
  const {city} = params
  //const page = searchParams.page || 1 // if undefined, default to 1. || coming from the search query it will be string, convert to number.
  const parsedPage = pageNumberSchema.safeParse(searchParams.page)

  if(!parsedPage.success){
    throw new Error('Invalid page number')
  }
  console.log(parsedPage)

  return (
    <main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
      <H1 className='mb-28'>
      {city === 'all' && "All Events"}
      {city !== 'all' && `Events in ${capitalize(city)}`} 
      </H1>

    <Suspense key={city + parsedPage} fallback={<LoadingCity/>}>
      <EventsList city={city} page={parsedPage.data}/>
    </Suspense>
    </main>
  )
}
