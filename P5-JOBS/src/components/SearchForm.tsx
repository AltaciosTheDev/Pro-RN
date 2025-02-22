import { useEffect, useState } from "react";

export default function SearchForm() {
  const [searchText, setSearchText] = useState<string>("")
  const [jobItems, setJobItems] = useState([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`fetching ${e.target.value}`)
    setSearchText(e.target.value)
    
  }

  useEffect(() => {
    if(!searchText) return

    const fetchJobItems = async () => {
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)
      if(!response.ok){
        throw new Error()
      }
      const data = await response.json()
      setJobItems(data.jobItems)
    }
    fetchJobItems()

  },[searchText])

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
