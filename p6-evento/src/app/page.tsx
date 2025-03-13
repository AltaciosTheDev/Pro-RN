import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-36 px-3">
      <h1 className="text-3xl lg:text-6xl font-bold tracking-tight">Find events around you</h1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
        Browse more than <span className="font-bold italic underline text-[#a4f839]">10,000 events </span>worldwide
      </p>
      <form className="w-full sm:w-[580px]">
        <input className="w-full h-16 rounded-lg bg-white/[7%] focus:bg-white/10 px-6 outline-none focus:ring-2 ring-[#a4f839]/50 transition" placeholder="Search events in any city" spellCheck={false}></input>
      </form>
      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Popular:</p>
        <div className="space-x-2 font-semibold">
        <Link href={"/events/austin"}>Austin</Link>
        <Link href={"/events/seattle"}>Seattle</Link>
        </div>
      </section>
    </main>
  );
}
