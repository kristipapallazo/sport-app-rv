import React, { Dispatch, FC, SetStateAction } from "react";
import DateBtn from "../../Button/DateButton";
import SportMenu from "../../Menu/SportMenu";

interface MainHeaderProps {
  selSport: SportId;
  setSelSport: SetStateFn<SportId>;
  setSelectDateModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MainHeader: FC<MainHeaderProps> = (props) => {
  const { selSport, setSelSport, setSelectDateModalIsOpen } = props;
  return (
    <div className="main-header">
      <DateBtn setSelectDateModalIsOpen={setSelectDateModalIsOpen} />
      <SportMenu selSport={selSport} setSelSport={setSelSport} />
    </div>
  );
};

export default MainHeader;
