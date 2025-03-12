import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

export default function Header() {
  return (
    <header>
        <Logo/>
        <Link href={"/"}>Home</Link>
        <Link href={"/events/all"}>All Events</Link>
        <Link href={"/event/1"}>Individual Event</Link>
    </header>
  )
}
