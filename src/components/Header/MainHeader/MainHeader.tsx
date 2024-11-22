import React, { Dispatch, FC, SetStateAction } from "react";
import DateBtn from "../../Button/DateButton";
import SportMenu from "../../Menu/SportMenu";

interface MainHeaderProps {
  selSport: SportId;
  setSelectDateModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MainHeader: FC<MainHeaderProps> = (props) => {
  const { selSport, setSelectDateModalIsOpen } = props;
  return (
    <div className="main-header">
      <DateBtn setSelectDateModalIsOpen={setSelectDateModalIsOpen} />
      <SportMenu selSport={selSport} />
    </div>
  );
};

export default MainHeader;
