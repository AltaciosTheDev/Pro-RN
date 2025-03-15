import H1 from "@/app/components/H1"
import { Evento } from "@/lib/types"
import Image from "next/image"

type Params = {
  slug: string
}

type EventPageProps = {
  params: Params
}

export default async function EventPage({params}:EventPageProps) {
  const {slug} = params

    const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`)
    const event: Evento = await response.json()
    console.log('------------------')
    console.log(event)
  return <main>
    <section className="relative overflow-hidden flex justify-center items-center">
      <Image
        className="object-cover blur-3xl z-0"
        fill
        quality={50}
        sizes="(max-width: 1280px) 100vw, 1280px"
        alt="Event bg image"
        src={event.imageUrl}
        priority
      ></Image>
      <div className="z-1 relative flex gap-6 lg:gap-16 flex-col lg:flex-row py-10 lg:py-20">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={300}
          height={201}
          className="rounded-xl border-2 border-white/50 w-full"
        />
        <div className="flex flex-col">
          <p className="text-white/75">
          {new Date(event.date).toLocaleDateString("en-US", {weekday: "long", month: "long", day:"numeric"})}
          </p>
          <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">{event.name}</H1>
          <p className="whitespace-nowrap text-xl">Organized by <span className="italic">{event.organizerName}</span></p>
          <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto py-2 border-2 border-white/10 rounded-md hover:scale-105 transition active:scale-[1.02]">Get tickets</button>
        </div>
      </div>
    </section>
    <div>

    </div>
  </main>
}
