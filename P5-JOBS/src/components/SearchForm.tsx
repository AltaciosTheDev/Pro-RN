import { useSearchTextContext } from "../lib/hooks";

export default function SearchForm() {
  const {searchText, setSearchText} = useSearchTextContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //alert("Form submitted");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.value)
    setSearchText(e.target.value)
    
  }

  return (
    <form onSubmit={handleSubmit} action="#" className="search">
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={handleOnChange}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}