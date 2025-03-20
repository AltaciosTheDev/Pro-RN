import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import prisma from "./db";
import { notFound } from "next/navigation";
import { ITEMS_PER_PAGE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function capitalize(text: string){
  if (!text) {
    throw new Error('Text is undefined or empty');
  }
  return text.charAt(0).toUpperCase() + text.substring(1)
}

export async function getEvents(city: string, page:number) {
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
}

export async function getEvent(slug: string) {
  try {
    const event = await prisma.evento.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    return notFound();
  }
}

export function determineLength<T>(items:T[]):number{
  return items.length
}