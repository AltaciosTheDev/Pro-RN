import { TFeedbackItem } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
  isLoading: boolean,
  feedbackItems: TFeedbackItem[],
  errorMessage: string,
  handleAddToList: (text: string) => void
}

export default function Container({handleAddToList, feedbackItems, isLoading, errorMessage}: ContainerProps) {


  return (
    <main className="container">
        <Header handleAddToList={handleAddToList} />
        <FeedbackList errorMessage={errorMessage} isLoading={isLoading} feedbackItems={feedbackItems}/>

    </main>
  )
}
