import Container from "./components/Container"
import Footer from "./components/Footer"
import HashtagList from "./components/HashtagList"
import { TFeedbackItem } from "../lib/types";
import { useEffect, useState } from "react";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
      method: 'POST',
      body: JSON.stringify(newItem), //server communicates in json
      headers:{
        Accept: 'application/json',
        "Content-Type": "application/json"
      }
    })

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
    <div className="app">
      <Footer/>
      <Container handleAddToList={handleAddToList} errorMessage={errorMessage} isLoading={isLoading} feedbackItems={feedbackItems}/>
      <HashtagList/>
    </div>
  )
}

export default App
