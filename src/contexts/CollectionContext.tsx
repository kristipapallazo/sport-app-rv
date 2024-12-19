import React, { FC, ReactNode, createContext, useEffect, useState } from "react";
import useFMcore from "../hooks/useFMcore";

interface DefaultValue {
  store: Bootstrap | undefined;
}
const defaultValue: DefaultValue = { store: undefined };
// const defaultValue: DefaultValue = { store: {} as Collection };

export const collectionCtx = createContext<DefaultValue>(defaultValue);

interface CollectionCtxProviderProps {
  children: ReactNode;
}

let isInitial = true;
const CollectionCtxProvider: FC<CollectionCtxProviderProps> = (props) => {
  const { children } = props;
  const [store, setStore] = useState<Bootstrap | undefined>(undefined);

  const ctx = useFMcore();

  useEffect(() => {
    if (isInitial) {
      const init = async () => {
        const bootstrap = await ctx?.FMcore.Sport?.getBootstrap();
        // const bootstrap = await ctx?.FMcore.Sport.getBootstrap();
        console.log("bootstrap :>> ", bootstrap);
        setStore(bootstrap);
      };
      init();
      isInitial = false;
    }
  }, [ctx]);

  return <collectionCtx.Provider value={{ store }}>{children}</collectionCtx.Provider>;
};

export default CollectionCtxProvider;
