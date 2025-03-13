import Link from 'next/link'
import React from 'react'

const routes = [
  {
    name: "Terms & Conditions",
    path: "/terms-conditions"
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy"
  }
]

export default function Footer() {
  return (
    <footer className='mt-auto flex justify-between border-t border-white/10 h-16 px-3 sm:px-9 items-center text-xs text-white/25'>
      <small className='text-xs'>&copy; 2050 Altacios. All Rights Reserved.</small>
      <ul className='flex gap-x-3 sm:gap-x-8'>
        {routes.map((route) => (
          <li key={route.path}><Link href={route.path}>{route.name}</Link></li>
        ))}
      </ul>
    </footer>
  )
}
