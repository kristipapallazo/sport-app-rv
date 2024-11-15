import { createContext, FunctionComponent, ReactNode, useContext, useEffect, useState } from "react";
import FMcoreWrapper from "../FMcoreWrapper";
import { User } from "../types/user";

export interface FMcoreContextType {
  FMcore: FMcore; // Adjust this type based on the library's structure
}

interface FMcoreProviderProps {
  children: ReactNode;
}

const FMcoreContext = createContext<FMcoreContextType | undefined>(undefined);

const FMcoreProvider: FunctionComponent<FMcoreProviderProps> = ({ children }) => {
  const [FMcore, setFMcore] = useState<any | null>(null);

  useEffect(() => {
    FMcoreWrapper()
      .then(() => {
        window.FMcore.init().then(() => {
          window.FMcore.setApp("sport").then(() => {
            setFMcore(window.FMcore);
            console.log("FMcore sport loaded");
          });
        });
      })
      .catch((error: any) => {
        console.error("Failed to load FMcore:", error);
      });
  }, []);

  if (!FMcore) return null;

  return <FMcoreContext.Provider value={{ FMcore }}>{children}</FMcoreContext.Provider>;
};

export { FMcoreContext, FMcoreProvider };
