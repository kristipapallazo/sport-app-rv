import React, { FC, ReactNode, createContext } from "react";

interface DefaultValue {
  store: Collection;
}
const defaultValue: DefaultValue = { store: {} as Collection };

export const collectionCtx = createContext<DefaultValue>(defaultValue);

interface CollectionCtxProviderProps<V = any> {
  children: ReactNode;
  value: V;
}

const CollectionCtxProvider: FC<CollectionCtxProviderProps> = (props) => {
  const { children, value } = props;
  console.log("value :>> ", value);

  return <collectionCtx.Provider value={value}>{children}</collectionCtx.Provider>;
};

export default CollectionCtxProvider;
