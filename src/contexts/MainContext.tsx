import React, { createContext, FC } from "react";

interface DefaultValue {
  selectedSports: SportAllIds;
}
const defaultValue: DefaultValue = { selectedSports: [] };

export const MainCtx = createContext<DefaultValue>(defaultValue);

interface MainContextProps {
  selectedSports: SportAllIds;
  children: React.ReactNode;
}

const MainContextProvider: FC<MainContextProps> = ({ selectedSports, children }) => {
  const value = { selectedSports };

  return <MainCtx.Provider value={value}>{children}</MainCtx.Provider>;
};

export default MainContextProvider;
