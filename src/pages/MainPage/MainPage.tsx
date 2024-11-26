import React, { FC, useEffect, useState } from "react";
import { collection } from "../../data/collection1";
import MainHeader from "../../components/Header/MainHeader/MainHeader";
import Content from "../../layouts/Content/Content";
import Left from "../../components/Sections/Left/Left";
import Right from "../../components/Sections/Right/Right";
import Center from "../../components/Sections/Center/Center";
import CollectionCtxProvider from "../../contexts/CollectionContext";
import DateModal from "../../components/Modal/DateModal";
import useFMcore from "../../hooks/useFMcore";
import AppHeader from "../../components/Header/AppHeader/AppHeader";

interface Props {}

let isInitial = true;

const MainPage: FC<Props> = () => {
  const [store, setStore] = useState<Collection>(collection);
  const [selSport, setSelSport] = useState<SportId>(1);
  const [selectDateModalIsOpen, setSelectDateModalIsOpen] = useState<boolean>(false);
  const [selectDateModal, setSelectDateModal] = useState<string>("All");
  const ctx = useFMcore();

  const handleDateModalClose = () => {
    setSelectDateModalIsOpen(false);
  };
  useEffect(() => {
    const test = async () => {
      const bootstrap = await ctx?.FMcore.Sport.getBootstrap();
      console.log("bootstrap :>> ", bootstrap);
    };
    test();
  }, []);

  return (
    <CollectionCtxProvider value={{ store }}>
      <div className="app">
        <AppHeader />
        <MainHeader selSport={selSport} setSelectDateModalIsOpen={setSelectDateModalIsOpen} />
        <Content>
          <Left />
          <Center />
          <Right />
        </Content>
      </div>
      {selectDateModalIsOpen && (
        <DateModal open={selectDateModalIsOpen} onCancel={handleDateModalClose} title="Available dates" />
      )}
    </CollectionCtxProvider>
  );
};

export default MainPage;
