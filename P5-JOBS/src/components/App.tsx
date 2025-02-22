import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [searchText, setSearchText] = useState<string>("")
  const [jobItems, setJobItems] = useState([])

  useEffect(() => {
    if(!searchText) return

    const fetchJobItems = async () => {
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)
      if(!response.ok){
        throw new Error()
      }
      const data = await response.json()
      console.log(data.jobItems)
      setJobItems(data.jobItems)
    }
    fetchJobItems()

  },[searchText])

  return (
    <>
      <Background />
      <Header searchText={searchText}  setSearchText={setSearchText} />
      <Container jobItems={jobItems} />
      <Footer/>
    </>
  );
}

export default App;
