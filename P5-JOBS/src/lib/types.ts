export type JobItem = { 
    id: number,
    badgeLetters: string,
    title: string
    company: string,
    daysAgo: number,
    relevanceScore: number,
  }

export type JobItemContent = JobItem & {
  companyURL: string,
  coverImgURL: string,
  description: string,
  duration: string,
  location: string,
  qualifications: string[],
  reviews: string [],
  salary: string
}

export type SortBy = 'relevant' | 'recent'

export type PageDirection = "previous" | "next"