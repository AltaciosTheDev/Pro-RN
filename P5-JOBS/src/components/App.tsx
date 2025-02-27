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
import {useJobItems } from "../lib/hooks";
import { useState } from "react";


function App() {
  //states
  const [searchText, setSearchText] = useState<string>("");
  const [jobItemsSliced, isLoading,jobItemsCount] = useJobItems(searchText)
  

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
    </>
  );
}

export default App;
