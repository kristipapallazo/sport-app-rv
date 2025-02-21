import React, { FC, ReactNode, createContext } from "react";

interface DefaultValue {
  store: GlobalStore | undefined;
}
const defaultValue: DefaultValue = { store: undefined };

export const collectionCtx = createContext<DefaultValue>(defaultValue);

interface CollectionCtxProviderProps {
  children: ReactNode;
  store: GlobalStore | undefined;
}

// let isInitial = true;
const CollectionCtxProvider: FC<CollectionCtxProviderProps> = (props) => {
  const { children, store } = props;

  return <collectionCtx.Provider value={{ store }}>{children}</collectionCtx.Provider>;
};

export default CollectionCtxProvider;
