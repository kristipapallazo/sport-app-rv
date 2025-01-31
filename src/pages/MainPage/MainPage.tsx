import React, { FC, useEffect, useMemo, useState } from "react";
// import { collection } from "../../data/collection1";
import MainHeader from "../../components/Header/MainHeader/MainHeader";
import Content from "../../layouts/Content/Content";
import Left from "../../components/Sections/Left/Left";
import Right from "../../components/Sections/Right/Right";
import Center from "../../components/Sections/Center/Center";
import CollectionCtxProvider from "../../contexts/CollectionContext";
import DateModal from "../../components/Modal/DateModal";
import AppHeader from "../../components/Header/AppHeader/AppHeader";
import useFMcore from "../../hooks/useFMcore";

interface Props {}

let isInitial = true;
const MainPage: FC<Props> = () => {
  const [store, setStore] = useState<Bootstrap | undefined>(undefined);
  const [selSport, setSelSport] = useState<SportId>(1);
  const [selectDateModalIsOpen, setSelectDateModalIsOpen] = useState<boolean>(false);
  // const [selectDateModal, setSelectDateModal] = useState<string>("All");

  console.log("selSport :>> ", selSport);
  const fmcore = useFMcore()!;

  const handleDateModalClose = () => {
    setSelectDateModalIsOpen(false);
  };

  const memoizedStore = useMemo(() => store, [store]);

  useEffect(() => {
    console.log("selSport :>> ", selSport);

    (async () => {
      const Interface = fmcore?.FMcore.Interface;
      if (!Interface) return;
      await Interface.initializeData(selSport);

      const rawBootstrap = Interface.getRawBootstrap();
      const bootstrap = Interface.getBootstrap();
      console.log("rawBootstrap, bootstrap :>> ", rawBootstrap, bootstrap);
      setStore(bootstrap);
    })();
  }, [fmcore?.FMcore.Interface, selSport]);

  useEffect(() => {
    if (isInitial) {
      setTimeout(() => {
        setSelSport(2);
      }, 4000);
    }
  }, []);

  // useEffect(() => {

  //   console.log("init uef");
  //   console.log("selSport in main uef :>> ", selSport);
  //   const Interface = fmcore?.FMcore.Interface;
  //   const init = async () => {
  //     console.log("Interface :>> ", Interface);
  //     if (!Interface) return;
  //     await Interface.initializeData(selSport);

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
  // }, [selSport, fmcore]);

  return (
    <>
      {store ? (
        <CollectionCtxProvider store={memoizedStore} /* sportId={selSport} */>
          <>
            <div className="app">
              <AppHeader />
              <MainHeader
                selSport={selSport}
                setSelSport={setSelSport}
                setSelectDateModalIsOpen={setSelectDateModalIsOpen}
              />
              <Content>
                <Left sportId={selSport} />
                <></>
                {/* <Center /> */}
                <Right />
              </Content>
            </div>
            {selectDateModalIsOpen && (
              <DateModal open={selectDateModalIsOpen} onCancel={handleDateModalClose} title="Available dates" />
            )}
          </>
        </CollectionCtxProvider>
      ) : (
        <div>no data</div>
      )}
    </>
  );
};

export default MainPage;
