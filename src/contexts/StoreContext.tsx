import { createContext, useState, ReactNode } from "react";
import { User } from "../types/user";
import useAuth from "../hooks/useAuth";

interface StoreProviderProps{
    children: ReactNode;
}

interface FiltersType  {
  id?: number;
  name?: string;
  pos?: number;
}

export type allSourcesType = {
  extra?: null,
  id : number,
  name? : string,
  pos? : number,
  spec? : number,
  sportId? : number,
  state? : number
}

export type allTranslationsType = {
  [lang: string]: {
    [id: number]: {
      shortName: string, 
      longName: string, 
      description: string
    }
  }
}

interface StoreContextType {
    user?: User | null;
    userStore: object,
    setUserStore: (userStore: object) => void,
    selectedTranslationType: string,
    setSelectedTranslationType: (selectedTranslationType: string) => void,
    filterList: FiltersType [],
    setFilterList: (filterList: []) => void,
    allTranslations: allTranslationsType,
    setAllTranslations: (allTranslations: allTranslationsType) => void,
    allSources: allSourcesType[],
    setAllSources: ( allSources: allSourcesType[]) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void
  }
  

const initialState: StoreContextType = { 
    userStore: {},
    setUserStore: (userStore) => {}, 
    selectedTranslationType: "cm",
    setSelectedTranslationType: (selectedTranslationType) => {},
    filterList: [],
    setFilterList: (filterList) => {},
    allTranslations: {},
    setAllTranslations: (allTranslations) => {},
    allSources: [],
    setAllSources: (allSources) => {},
    loading: false,
    setLoading: (loading) => {}
  };



const StoreContext = createContext(initialState)

const StoreProvider: React.FC <StoreProviderProps> = ({children}) => {
const [userStore, setUserStore] = useState<Object>({})
const [selectedTranslationType, setSelectedTranslationType] = useState<string>("cm");
const [filterList, setFilterList] = useState<[]>([]);
const [allTranslations, setAllTranslations] = useState<{}>({});
const [allSources, setAllSources] = useState<allSourcesType[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const {user} = useAuth();

  return (
    <StoreContext.Provider 
        value ={{
            ...initialState,
            user,
            userStore,
            setUserStore,
            selectedTranslationType,
            setSelectedTranslationType,
            filterList,
            setFilterList,
            allTranslations,
            setAllTranslations,
            allSources,
            setAllSources,
            loading,
            setLoading
        }}>
            {children}
    </StoreContext.Provider>
  )
}

export {StoreContext, StoreProvider}

