export default function Stats({numberOfWords, numberOfCharacters,facebookCharactersLeft,instagramCharactersLeft}) {
  return <section className="stats">
    <Stat label="Words" number={numberOfWords}/>
    <Stat label="Characters" number={numberOfCharacters}/>
    <Stat label="Instagram" number={instagramCharactersLeft}/>
    <Stat label="Facebook" number={facebookCharactersLeft}/>
  </section>;
}

function Stat({number, label}) {
  return (
    <section className="stat">
      <span className={`stat__number ${number<0 ? "stat__number--limit": ""}`}>{number}</span>
      <h3 className="second-heading">{label}</h3>
    </section>
  );
}
