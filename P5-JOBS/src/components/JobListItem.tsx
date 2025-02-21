
export default function JobListItem() {
  return (
    <li className="job-item">
      <a className="job-item__link">
        <div className="job-item__badge"></div>

        <div className="job-item__middle">
          <h3 className="third-heading"></h3>
          <p className="job-item__company"></p>
        </div>

        <div className="job-item__right">
          
          <time className="job-item__time"></time>
        </div>
      </a>
    </li>
  );
}
