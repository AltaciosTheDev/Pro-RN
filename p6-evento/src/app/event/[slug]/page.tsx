import H1 from "@/app/components/H1"
import notFound from "@/app/not-found"
import { getEvent } from "@/lib/server-utils"
import { capitalize} from "@/lib/utils"
import { Metadata } from "next"
import Image from "next/image"

type Params = {
  slug: string
}

type EventPageProps = {
  params: Params
}


export async function generateMetadata({params}: EventPageProps): Promise<Metadata> {
  const {slug} = params

  const event = await getEvent(slug)

  return {
    title: "Event not found"
  };
}

export async function generateStaticParams() {
  //top 100 mnost popular events 
  return [{
    slug: 'comedy-extravaganza'
  },{
    slug: 'dj-practice-session'
  }
]
}

export default async function EventPage({params}:EventPageProps) {
  const {slug} = params
    
    const event = await getEvent(slug)
    
    if (!event) {
      return notFound();  // This renders a 404 page
    }

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
          <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto py-2 border-2 border-white/10 rounded-md state-effects">Get tickets</button>
        </div>
      </div>
    </section>
    <div className="text-center px-5 py-16">
      <Section>
        <SectionHeading>About this event</SectionHeading>
        <SectionContent>{event.description}</SectionContent>
      </Section>
      <Section>
      <SectionHeading>Location</SectionHeading>
      <SectionContent>{event.location}</SectionContent>
      </Section>
    </div>
  </main>
}

function Section({children}: {children: React.ReactNode}) {
  return <section className="mb-12">{children}</section>
}

function SectionHeading({children}: {children: React.ReactNode}) {
  return <h2 className="mb-8 text-2xl">{children}</h2>
}

function SectionContent({children}: {children: React.ReactNode}) {
  return <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">{children}</p>
}

