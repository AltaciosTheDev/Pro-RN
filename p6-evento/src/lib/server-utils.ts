import "server-only"
import notFound from "@/app/not-found"
import prisma from "./db"
import { unstable_cache } from "next/cache"
import { capitalize } from "./utils"
import { ITEMS_PER_PAGE } from "./constants"
import { Evento } from "@prisma/client"

export const getEvents = unstable_cache(async (city: string, page:number): Promise<{ events: Evento[]; itemsOnPage: number }> => {
    //const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,{next:{revalidate:300}})
    //const events: Evento[] = await response.json()
    const events = await prisma.evento.findMany({
      where:{
        city: city === "all"? undefined :capitalize(city) //must match exactly 
      },
      orderBy:  {
        date: "asc"
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE
    })
  
    const itemsOnPage = await prisma.evento.count({
      where: {
        city: city === "all"? undefined :capitalize(city) //must match exactly 
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE
    })
    return {events,itemsOnPage}
  })
  
  export const getEvent = unstable_cache(async (slug: string): Promise<Evento | null> => {
    try {
      const event = await prisma.evento.findUnique({
        where: { slug },
      });
  
      // Return event if found, otherwise return null
      return event || null;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null; // Return null if an error occurs
    }
  });