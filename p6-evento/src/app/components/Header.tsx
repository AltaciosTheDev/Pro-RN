import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Events",
    path: "/events/all",
  },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/10 h-14 px-3 sm:px-9">
      <Logo />
      <nav>
        <ul className="flex gap-x-6 text-sm">
          {routes.map((route) => (
            <li key={route.path} className="text-white/50 hover:text-white hover:scale-110 transition">
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
