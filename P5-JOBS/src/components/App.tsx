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
import {useDebounce, useJobItems } from "../lib/hooks";
import {useState } from "react";
import { ITEMS_PER_PAGE } from "../lib/constants";
import { Toaster } from "react-hot-toast";


function App() {
  //states
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText)
  const [jobItems, isLoading] = useJobItems(debouncedSearchText)

  //derived states
  const jobItemsSliced = jobItems?.slice(0 ,ITEMS_PER_PAGE) || []
  const jobItemsCount = jobItems?.length || 0

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
            <ResultsCount jobItemsCount={jobItemsCount}/>
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading}/>
          <PaginationControls />
        </Sidebar>
        <JobItemContent/>
      </Container>
      <Footer />
      <Toaster position="top-right"/>
    </>
  );
}

export default App;
