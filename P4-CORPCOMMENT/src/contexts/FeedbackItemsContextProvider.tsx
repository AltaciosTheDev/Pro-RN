import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

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
  //states
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  //handlers of states
  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };
  //handlers of state
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

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          throw new Error(); //this goes to the catch immediately.
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
        setIsLoading(false);
      } catch {
        //network error
        //not 2xx response
        //json parsing error
        setErrorMessage("Something went wrong.");
        setIsLoading(false);
      }
    };
    fetchFeedbackItems();
  }, []);

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

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not defined in FeedbackList component"
    );
  }
  return context;
}
