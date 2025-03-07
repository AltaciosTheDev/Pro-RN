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
import PaginationControls from "./PaginationControls";
import JobList from "./JobList";
import { useDebounce, useSearchQuery } from "../lib/hooks";
import { useState } from "react";
import { ITEMS_PER_PAGE } from "../lib/constants";
import { Toaster } from "react-hot-toast";
import { PageDirection, SortBy } from "../lib/types";


function App() {
  //states
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText);
  const [jobItems, isLoading] = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>('relevant')

  //derived states
  const jobItemsSorted = [...(jobItems || [])].sort((a,b) => {
     if(sortBy === 'recent'){
      return a.daysAgo - b.daysAgo
    }
    else if(sortBy === 'relevant'){
      return b.relevanceScore - a.relevanceScore
    }
    return 0
  })
  const jobItemsSliced =
  jobItemsSorted?.slice(
      currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ) || [];
  const jobItemsCount = jobItems?.length || 0;
  const lastPage = jobItemsCount / ITEMS_PER_PAGE;
  console.log(sortBy)
  //handlers
  const handleChangePage = (pagination: PageDirection) => {
    if (pagination === "previous") {
      setCurrentPage((prev) => prev - 1);
      
    } else if (pagination === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortBy = (sortOption: SortBy) => {
    setSortBy(sortOption)
    setCurrentPage(1)
  }





  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton/>
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount jobItemsCount={jobItemsCount} />
            <SortingControls sortOption={sortBy} handleSortBy={handleSortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading}/>
          <PaginationControls
            lastPage={lastPage}
            currentPage={currentPage}
            onChangePage={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />

      
    </>
  );
}

export default App;
