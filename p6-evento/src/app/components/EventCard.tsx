"use client";

import { Evento } from "@/lib/types";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type EventCardProps = {
  event: Evento;
};

const MotionLink = motion(Link);

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <MotionLink
      ref={ref}
      className="flex-1 basis-80 max-w-[500px]"
      href={`/event/${event.slug}`}
      //@ts-ignore
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      initial={{ scale: 0.8, opacity: 0 }}
    >
      <section className="state-effects relative flex flex-col h-[380px] bg-white/[3%] rounded-xl overflow-hidden">
        <Image
          width={500}
          height={280}
          alt="EVENTO logo"
          src={event.imageUrl}
          className="h-[60%] object-cover"
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
    </MotionLink>
  );
}
