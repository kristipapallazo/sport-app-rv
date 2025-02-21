import { useContext } from "react";
import { collectionCtx } from "../contexts/CollectionContext";

const useCollection = (): GlobalStore | undefined => {
  const ctxVal = useContext(collectionCtx);
  console.log("ctxVal", ctxVal);
  // if (!ctxVal) throw new Error("Error: Collection context value does not exist!");
  const { store } = ctxVal;

  return store;
};

export default useCollection;
