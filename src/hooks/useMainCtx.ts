import { useContext } from "react";
import { MainCtx } from "../contexts/MainContext";

const useMainCtx = () => {
  const ctxVal = useContext(MainCtx);

  if (!ctxVal) throw new Error("Error: Collection context value does not exist!");

  return ctxVal;
};

export default useMainCtx;
