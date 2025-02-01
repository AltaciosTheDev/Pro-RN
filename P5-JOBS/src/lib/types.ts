export type JobItem = {
    id: number,
    badgeLetters: string,
    title: string,
    company: string,
    daysAgo: number,
    relevanceScore: number,
    date: string
  }

  //perfect use for intersection type 
  export type JobItemContent = JobItem & {
    description: string,
    qualifications: string [],
    reviews: string [],
    duration: string
    location: string
    salary: string
    coverImgURL: string,
    companyURL: string
  }