import { TriangleUpIcon } from "@radix-ui/react-icons";
import {TFeedbackItem} from "../../lib/types";
import { useState } from "react";

type FeebackItemProps = {
  feedbackItem: TFeedbackItem
};

export default function FeedbackItem({ feedbackItem }: FeebackItemProps) {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;
  const [open, setOpen] =  useState(false)
  const [upvoteCountLocal, setUpvoteCountLocal] = useState(upvoteCount)

  const handleUpvote= (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCountLocal((prev) => ++prev) 
    e.currentTarget.disabled = true //tagret of the element that triggered the event
    e.stopPropagation() 
  }

  return (
    <li className={`feedback ${open ? 'feedback--expand' : ""}`} onClick={() => setOpen((prev) => !prev)} >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCountLocal}</span>
      </button>
      <div>
        <p>{badgeLetter}</p>
      </div>
      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>
      <p>{daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
    </li>
  );
}
