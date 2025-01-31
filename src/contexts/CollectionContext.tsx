import React, { FC, ReactNode, createContext } from "react";

interface DefaultValue {
  store: Bootstrap | undefined;
  // sportId: SportId;
}
const defaultValue: DefaultValue = { store: undefined /* sportId: 1 */ };

export const collectionCtx = createContext<DefaultValue>(defaultValue);

interface CollectionCtxProviderProps {
  children: ReactNode;
  store: Bootstrap | undefined;
  // sportId: SportId;
}

// let isInitial = true;
const CollectionCtxProvider: FC<CollectionCtxProviderProps> = (props) => {
  const { children, store /* sportId */ } = props;

  return <collectionCtx.Provider value={{ store /* sportId */ }}>{children}</collectionCtx.Provider>;
};

export default CollectionCtxProvider;
