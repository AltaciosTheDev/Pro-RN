import BookmarkIcon from "./BookmarkIcon";

type JobItem = {
  id: number,
  badgeLetters: string,
  title: string,
  company: string,
  daysAgo: number,
  relevanceScore: number,
  date: string
}

type JobListItemProps = {
  jobItem: JobItem
}

export default function JobListItem({jobItem}: JobListItemProps) {
  const {badgeLetters, company, title, daysAgo} = jobItem

  return (
    <li className="job-item">
      <a className="job-item__link">
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{company}</h3>
          <p className="job-item__company">{title}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
