import { useContext } from "react";
import { FMcoreContext } from "../contexts/FMcoreContext";

export const useFMcore = () => {
  const context = useContext(FMcoreContext);
  if (!context) {
    throw new Error("useYourLibraryContext must be used within a YourLibraryProvider");
  }
  return context;
};

export default useFMcore;
