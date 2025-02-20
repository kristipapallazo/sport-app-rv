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

interface Props {}

let isInitial = true;
let sportListSaved = false;
const MainPage: FC<Props> = () => {
  const [store, setStore] = useState<SportsBootstrap>({});
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
    console.log("memoizedSelectedSports :>> ", memoizedSelectedSports);
    if (isInitial) {
      /* Inject the Socket update event handler */
      document.addEventListener("get-socket-update" as any, function (e: CustomEvent) {
        handleSocketEventUpdate(e.detail);
      });

      isInitial = false;
    }

    (async () => {
      const Interface = fmcore?.FMcore.Interface;
      if (!Interface) return;
      const sportId = memoizedSelectedSports[memoizedSelectedSports.length - 1];
      await Interface.initializeData(sportId);

      // const rawBootstrap = Interface.getRawBootstrap();
      const live = 0;
      const bootstrap = Interface.getBootstrap(sportId, live);
      // console.log("rawBootstrap, bootstrap :>> ", rawBootstrap, bootstrap);
      if (!sportListSaved && bootstrap.sportAllIds && bootstrap.sportById) {
        const sportList: SportListDestructed = { sportById: bootstrap.sportById, sportAllIds: bootstrap.sportAllIds };
        setStore((prev) => {
          return { ...prev, sportList, [sportId]: bootstrap };
        });
        sportListSaved = true;
      } else {
        setStore((prev) => {
          return { ...prev, [sportId]: bootstrap };
        });
      }
      setIsLoading(false);
    })();
  }, [fmcore?.FMcore.Interface, memoizedSelectedSports]);

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
        <CollectionCtxProvider store={memoizedStore} /* sportId={selectedSports} */>
          <>
            <div className="app">
              <AppHeader />
              {store.sportList && (
                <MainHeader
                  selectedSports={memoizedSelectedSports}
                  setSelectedSports={setSelectedSports}
                  setIsLoading={setIsLoading}
                  setSelectDateModalIsOpen={setSelectDateModalIsOpen}
                />
              )}
              <Content>
                <Left />
                <>{/* <Center /> */}</>

                <Right />
              </Content>
            </div>
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
