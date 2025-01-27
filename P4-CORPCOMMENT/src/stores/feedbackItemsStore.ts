import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[],
  isLoading: boolean,
  errorMessage: string,
  selectedCompany: string,
  getCompanyList: () => string[],
  getFilteredFeedbackItems: () => TFeedbackItem[],
  addItemToList: (text: string) => Promise<void>, 
  selectCompany: (company:string) => void,
  fetchFeedbackItems: () => Promise<void>
}

export const useFeedbackItemsStore = create<Store>((set,get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get().feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index)
  },
  getFilteredFeedbackItems: () => {
    const state = get()
    return state.selectedCompany ? state.feedbackItems.filter(
        (feedbackItem) => feedbackItem.company === state.selectedCompany
      )
    : state.feedbackItems 
  },
  addItemToList: async (text: string) => {
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
      set((state) => ({feedbackItems:[...state.feedbackItems, newItem]}))
      //persist data on server (second)
      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          body: JSON.stringify(newItem), //server communicates in json
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        }
      )
    },
  selectCompany: (company:string) => set({selectedCompany: company}),
  fetchFeedbackItems: async () => {
    set({isLoading: true})
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      )
      if (!response.ok) {
        throw new Error(); //this goes to the catch immediately.
      }
      const data = await response.json();
      set({feedbackItems: data.feedbacks});
      set({isLoading:false});
    } catch {
      //network error
      //not 2xx response
      //json parsing error
      set({errorMessage: "Something went wrong."});
      set({isLoading: false});
    }
  }
}))