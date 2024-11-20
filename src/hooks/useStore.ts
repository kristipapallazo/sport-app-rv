import { useContext } from "react";
import { StoreContext } from "../contexts/StoreContext";
import useCollection from "./useCollection";

export const useStore = () => {
  const context = useCollection();
  if (!context) throw new Error("useStore must be used inside StoreProvider");

  return context;
};
