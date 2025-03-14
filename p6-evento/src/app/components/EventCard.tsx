import { Evento } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

type EventCardProps = {
    event: Evento
}

export default function EventCard({event}: EventCardProps) {
  return (
    <section className='flex flex-col h-[380px] flex-1 basis-80 max-w-[500px] bg-white/[3%] rounded-xl overflow-hidden'>
        <Image
            width={500}
            height={280}
            alt="EVENTO logo"
            src={event.imageUrl}
            className='h-[60%] object-fit'
        ></Image>
        <div className='flex flex-col justify-center items-center flex-1'>
            <h2 className='text-2xl font-semibold'>{event.name}</h2>
            <p className='italic text-white/[75%]'>By {event.organizerName}</p>
            <p className='text-sm text-white/50 mt-4'>{event.location}</p>
        </div>
    </section>
  )
}
