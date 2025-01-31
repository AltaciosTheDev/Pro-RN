import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext);
    if (!context) {
      throw new Error(
        "FeedbackItemsContext is not defined in FeedbackList component"
      );
    }
    return context;
  }

  //hook to encapsulate declaration and initial values of the 3 related states in 1 hook that is named after the feature
  export function useFeedbackItems() {//encapsulate logic that only deals with one thing. 
      const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
      const [isLoading, setIsLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");

      //zustanded
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
    
      return {
        feedbackItems,
        isLoading,
        errorMessage,
        setFeedbackItems,
        setIsLoading,
        setErrorMessage
      }
  }
  