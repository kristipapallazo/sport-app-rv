import { useContext } from "react";
import { collectionCtx } from "../contexts/CollectionContext";

const useCollection = (): Bootstrap | undefined => {
  const ctxVal = useContext(collectionCtx);
  if (!ctxVal) throw new Error("Error: Collection context value does not exist!");
  const { store } = ctxVal;

  return store;
};

export default useCollection;
