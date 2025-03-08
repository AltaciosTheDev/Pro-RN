import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkContexProvider from "./contexts/BookmarkContexProvider.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveIdContextProvider>
        <BookmarkContexProvider>
          <App />
        </BookmarkContexProvider>
      </ActiveIdContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
