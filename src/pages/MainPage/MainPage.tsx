import React, { FC, useState } from "react";
// import { collection } from "../../data/collection1";
import MainHeader from "../../components/Header/MainHeader/MainHeader";
import Content from "../../layouts/Content/Content";
import Left from "../../components/Sections/Left/Left";
import Right from "../../components/Sections/Right/Right";
import Center from "../../components/Sections/Center/Center";
import CollectionCtxProvider from "../../contexts/CollectionContext";
import DateModal from "../../components/Modal/DateModal";
import AppHeader from "../../components/Header/AppHeader/AppHeader";
import useCollection from "../../hooks/useCollection";

interface Props {}

const MainPage: FC<Props> = () => {
  const [selSport, setSelSport] = useState<SportId>(1);
  const [selectDateModalIsOpen, setSelectDateModalIsOpen] = useState<boolean>(false);
  const [selectDateModal, setSelectDateModal] = useState<string>("All");
  const store = useCollection();

  const handleDateModalClose = () => {
    setSelectDateModalIsOpen(false);
  };

  return (
    <>
      {store ? (
        <>
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
        </>
      ) : (
        <div>no data</div>
      )}
    </>
  );
};

export default MainPage;
