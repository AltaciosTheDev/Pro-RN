import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import {useDebounce, useJobItems } from "../lib/hooks";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  //pure state or custom hooks
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce<string>(searchText, 200)
  const {jobItems, isLoading} = useJobItems(debouncedSearchText) //custom hook 
  const [currentPage, setCurrentPage] = useState(1)

  //derived information will be handled where it is implemented
  const totalNumberOfResults = jobItems?.length || 0 //guard clause in undefined case
  const jobItemsSliced = jobItems?.slice(0,7) || []//guard clause

  //event handlers or functions to update state 
  const handleChangePage = (direction: "next" | "previous") => {
    if(direction === "next"){
      setCurrentPage((prev) => prev + 1)
    }
    else if(direction === "previous"){
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults}/>
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading}/>
          <PaginationControls previousPage={currentPage - 1} onClick={handleChangePage} nextPage={currentPage + 1}/>
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />

      <Toaster position={"top-right"}/>
    </>
  );
}

export default App;
