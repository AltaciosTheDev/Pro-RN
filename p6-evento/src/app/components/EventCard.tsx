import { Evento } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type EventCardProps = {
  event: Evento;
};

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);

  return (
    <Link className="flex-1 basis-80 max-w-[500px]" href={`/event/${event.slug}`}>
      <section className="hover:scale-105 transition active:scale-[1.02] relative flex flex-col h-[380px] bg-white/[3%] rounded-xl overflow-hidden">
        <Image
          width={500}
          height={280}
          alt="EVENTO logo"
          src={event.imageUrl}
          className="h-[60%] object-fit"
        ></Image>
        <div className="flex flex-col justify-center items-center flex-1">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/[75%]">By {event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>
        <section className="bg-black/30 absolute left-[12px] top-[12px] h-[45px] w-[45px] flex items-center flex-col">
          <p className="text-xl font-bold">
            {date.toLocaleDateString("en-US", { day: "2-digit" })}
          </p>
          <p className="text-xs uppercase text-accent">
            {date.toLocaleDateString("en-US", { month: "short" })}
          </p>
        </section>
      </section>
    </Link>
  );
}
