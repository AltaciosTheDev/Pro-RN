import { TriangleUpIcon } from "@radix-ui/react-icons";
import {TFeedbackItem} from "../lib/types";



type FeebackItemProps = {
  feedbackItem: TFeedbackItem
};

export default function FeedbackItem({ feedbackItem }: FeebackItemProps) {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;

  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
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
