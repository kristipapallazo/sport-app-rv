import React, { FC, ReactNode, createContext } from "react";

interface DefaultValue {
  store: SportsBootstrap;
}
const defaultValue: DefaultValue = { store: {} };

export const collectionCtx = createContext<DefaultValue>(defaultValue);

interface CollectionCtxProviderProps {
  children: ReactNode;
  store: SportsBootstrap;
}

// let isInitial = true;
const CollectionCtxProvider: FC<CollectionCtxProviderProps> = (props) => {
  const { children, store } = props;

  return <collectionCtx.Provider value={{ store }}>{children}</collectionCtx.Provider>;
};

export default CollectionCtxProvider;
