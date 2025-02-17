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

interface Props {}

let isInitial = true;
const MainPage: FC<Props> = () => {
  const [store, setStore] = useState<Bootstrap | undefined>(undefined);
  const [selectedSports, setSelectedSports] = useState<SportAllIds>([1]);
  const [selectDateModalIsOpen, setSelectDateModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let [testVar, setTestVar] = useState<any>(sessionStorage.getItem("socket-update"));
  // const [selectDateModal, setSelectDateModal] = useState<string>("All");

  testVar = "test";
  console.log("selectedSports :>> ", selectedSports);
  const fmcore = useFMcore()!;

  // const handleDateModalClose = () => {
  //   // setSelectDateModalIsOpen(false);
  // };
  console.log("testVar", testVar);

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

  useEffect(() => {
    console.log("memoizedSelectedSports :>> ", memoizedSelectedSports);
    if (isInitial) {
      document.addEventListener("get-socket-update" as any, function (e: CustomEvent) {
        handleSocketEventUpdate(e.detail);
      });

      isInitial = false;
    }

    (async () => {
      const Interface = fmcore?.FMcore.Interface;
      if (!Interface) return;
      await Interface.initializeData(memoizedSelectedSports[0]);

      const rawBootstrap = Interface.getRawBootstrap();
      const bootstrap = Interface.getBootstrap();
      console.log("rawBootstrap, bootstrap :>> ", rawBootstrap, bootstrap);
      setStore(bootstrap);
      setIsLoading(false);
    })();
  }, [fmcore?.FMcore.Interface, memoizedSelectedSports]);

  useEffect(() => {
    // if (isInitial) {
    //   setTimeout(() => {
    //     setSelSport(2);
    //   }, 4000);
    // }
  }, []);

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
    <>
      {isLoading ? (
        <div>isloading</div>
      ) : store ? (
        <CollectionCtxProvider store={memoizedStore} /* sportId={selectedSports} */>
          <>
            <div className="app">
              <AppHeader />
              <MainHeader
                selectedSports={memoizedSelectedSports}
                setSelectedSports={setSelectedSports}
                setIsLoading={setIsLoading}
                setSelectDateModalIsOpen={setSelectDateModalIsOpen}
              />
              <Content>
                <Left sportId={selectedSports[0]} />
                <>{/* <Center /> */}</>

                <Right />
              </Content>
            </div>
            {/* {selectDateModalIsOpen && (
              <DateModal open={selectDateModalIsOpen} onCancel={handleDateModalClose} title="Available dates" />
            )} */}
          </>
        </CollectionCtxProvider>
      ) : (
        <div>no data</div>
      )}
    </>
  );
};

export default MainPage;
