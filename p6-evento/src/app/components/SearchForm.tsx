'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchForm() {
    const [search, setSearch] = useState("")
    const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/events/${search}`)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="w-full h-16 rounded-lg bg-white/[7%] focus:bg-white/10 px-6 outline-none focus:ring-2 ring-accent/50 transition"
        placeholder="Search events in any city"
        spellCheck={false}
      ></input>
    </form>
  );
}
