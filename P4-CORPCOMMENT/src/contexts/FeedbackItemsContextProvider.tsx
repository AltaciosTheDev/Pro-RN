import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type FeedbackItemsContextProps = {
  isLoading: boolean;
  filteredFeedbackItems: TFeedbackItem[];
  errorMessage: string;
  handleAddToList: (text: string) => void;
  companyList: string[];
  selectedCompany: string;
  handleSelectCompany: (company: string) => void;
};

export const FeedbackItemsContext =
  createContext<FeedbackItemsContextProps | null>(null);

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  //states - zustanded
  const{feedbackItems, isLoading, errorMessage, setFeedbackItems} = useFeedbackItems()
  const [selectedCompany, setSelectedCompany] = useState("");

  //derived states
  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );

  //derived states
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  ); //the main items worked on , the variable that will change them

  //handlers of states - zustanded
  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };
  //handlers of state - zustanded
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))! //the undefinde case will literally not happen.
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    //optimisitic ui pattern: update state (first)
    setFeedbackItems([...feedbackItems, newItem]); //appends new item to localState, does not update data in server
    //persist data on server (second)
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem), //server communicates in json
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };


  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        filteredFeedbackItems,
        selectedCompany,
        handleSelectCompany

      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}

