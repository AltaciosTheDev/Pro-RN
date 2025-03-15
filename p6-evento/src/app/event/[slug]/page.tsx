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
    <section className="relative h-[361px] overflow-hidden">
      <Image
        className="object-cover blur-3xl z-0"
        fill
        quality={50}
        sizes="(max-width: 1280px) 100vw, 1280px"
        alt="Event bg image"
        src={event.imageUrl}
        priority
      ></Image>
      <div className="z-1 relative">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={300}
          height={201}
        />
      </div>
    </section>
    <div>

    </div>
  </main>
}
