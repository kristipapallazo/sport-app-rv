import React, { FC, useEffect, useMemo, useState } from "react";
// import { collection } from "../../data/collection1";
import MainHeader from "../../components/Header/MainHeader/MainHeader";
import Content from "../../layouts/Content/Content";
import Left from "../../components/Sections/Left/Left";
import Right from "../../components/Sections/Right/Right";
import Center from "../../components/Sections/Center/Center";
import CollectionCtxProvider from "../../contexts/CollectionContext";
// import DateModal from "../../components/Modal/DateModal";
import AppHeader from "../../components/Header/AppHeader/AppHeader";
import useFMcore from "../../hooks/useFMcore";
import MainContextProvider from "../../contexts/MainContext";
import { all } from "axios";

interface Props {}

let isInitial = true;
let sportListSaved = false;
const MainPage: FC<Props> = () => {
  const [store, setStore] = useState<GlobalStore | undefined>(undefined);
  const [selectedSports, setSelectedSports] = useState<SportAllIds>([1]);
  const [selectDateModalIsOpen, setSelectDateModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [selectDateModal, setSelectDateModal] = useState<string>("All");

  console.log("selectedSports :>> ", selectedSports);
  console.log("store", store);
  const fmcore = useFMcore()!;

  // const handleDateModalClose = () => {
  //   // setSelectDateModalIsOpen(false);
  // };

  const memoizedStore = useMemo(() => store, [store]);
  const memoizedSelectedSports = useMemo(() => selectedSports, [selectedSports]);

  const handleSocketEventUpdate = (message: string) => {
    console.log("message", message);
    switch (message) {
      case "test":
        break;

      default:
        break;
    }
  };

  console.log("store", store);
  useEffect(() => {
    (async () => {
      console.log("memoizedSelectedSports :>> ", memoizedSelectedSports);
      const Interface = fmcore?.FMcore.Interface;
      if (!Interface) return;
      const sportId = memoizedSelectedSports[memoizedSelectedSports.length - 1];
      await Interface.initializeData(sportId);

      if (isInitial) {
        /* Inject the Socket update event handler */
        document.addEventListener("get-socket-update" as any, function (e: CustomEvent) {
          handleSocketEventUpdate(e.detail);
        });
        const sportList = Interface.getSportListDestructured();
        console.log("sportList", sportList);
        setStore((prev) => (prev ? { ...prev, sportList } : { sportList }));

        // /* get market groups */
        try {
          const mg = await Interface.getMarketGroups();
        } catch (error) {
          console.log("error", error);
        }

        isInitial = false;
      }

      const fullBootstrap = Interface.getFullBootstrap(sportId);
      console.log("fullBootstrap", fullBootstrap);
      setStore((prev) => (prev ? { ...prev, [sportId]: fullBootstrap } : undefined));
      // setStore({ sportList, [sportId]: fullBootstrap });

      setIsLoading(false);
    })();
  }, [fmcore?.FMcore.Interface, memoizedSelectedSports]);
  //adminaccess

  // useEffect(() => {

  //   console.log("init uef");
  //   console.log("selectedSports in main uef :>> ", selectedSports);
  //   const Interface = fmcore?.FMcore.Interface;
  //   const init = async () => {
  //     console.log("Interface :>> ", Interface);
  //     if (!Interface) return;
  //     await Interface.initializeData(selectedSports);

  //     const rawBootstrap = Interface.getRawBootstrap();
  //     const bootstrap = Interface.getBootstrap();
  //     console.log("rawBootstrap, bootstrap :>> ", rawBootstrap, bootstrap);
  //     setStore(bootstrap);

  //     const testData = () => {
  //       const { el } = rawBootstrap;
  //       const { allMatches } = bootstrap;
  //       console.log("allMatches :>> ", allMatches);

  //       const list = el;
  //       const logs: any[] = [];
  //       const liveMatchLogs: any[] = [];

  //       allMatches.forEach((matchId) => {
  //         if (matchId.includes("l")) liveMatchLogs.push(matchId);
  //       });
  //       Object.keys(list).forEach((eventId: string | number) => {
  //         const { c, t } = list[eventId];
  //         const [categId] = c;
  //         const [tourId] = t;
  //         // if (+categId === 26) {
  //         if (+tourId === 36699) {
  //           logs.push({ e: eventId, c: categId, t: tourId });
  //         }
  //       });

  //       console.log("logs, liveMatchLogs :>> ", logs, liveMatchLogs);
  //     };
  //     // testData();
  //   };
  //   init();

  //   // if (isInitial) {
  //   //   isInitial = false;
  //   //   init();
  //   // }
  //   // setTimeout(() => {
  //   //   setSelSport(2);
  //   // }, 4000);
  // }, [selectedSports, fmcore]);

  return (
    <MainContextProvider selectedSports={selectedSports}>
      {isLoading ? (
        <div>isloading</div>
      ) : (
        <CollectionCtxProvider store={memoizedStore}>
          <>
            {store?.sportList && (
              <div className="app">
                <AppHeader />
                <MainHeader
                  selectedSports={memoizedSelectedSports}
                  setSelectedSports={setSelectedSports}
                  setIsLoading={setIsLoading}
                  setSelectDateModalIsOpen={setSelectDateModalIsOpen}
                />
                <Content>
                  <Left />
                  <Center />

                  <>{/* <Right /> */}</>
                </Content>
              </div>
            )}
            {/* {selectDateModalIsOpen && (
              <DateModal open={selectDateModalIsOpen} onCancel={handleDateModalClose} title="Available dates" />
            )} */}
          </>
        </CollectionCtxProvider>
      )}
    </MainContextProvider>
  );
};

export default MainPage;
