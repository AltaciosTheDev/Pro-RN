type SearchFormProps = {
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchForm({searchText,setSearchText}: SearchFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
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