import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1>Find events around you</h1>
      <p>
        Browse more than <span>10,000 events worldwide</span>
      </p>
      <form>
        <input placeholder="Search events in any city" spellCheck={false}></input>
      </form>
      <section>
        <p>Popular:</p>
        <div>
        <Link href={"/events/austin"}>Austin</Link>
        <Link href={"/events/seattle"}>Seattle</Link>
        </div>
      </section>
    </main>
  );
}
