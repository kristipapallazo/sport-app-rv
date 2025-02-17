import React, { Dispatch, FC, SetStateAction } from "react";
import DateBtn from "../../Button/DateButton";
import SportMenu from "../../Menu/SportMenu";

interface MainHeaderProps {
  selectedSports: SportAllIds;
  setSelectedSports: SetStateFn<SportAllIds>;
  setSelectDateModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: SetStateFn<boolean>;
}

const MainHeader: FC<MainHeaderProps> = (props) => {
  const { setSelectedSports, selectedSports, setSelectDateModalIsOpen, setIsLoading } = props;
  return (
    <div className="main-header">
      <DateBtn setSelectDateModalIsOpen={setSelectDateModalIsOpen} />
      <SportMenu setSelectedSports={setSelectedSports} selectedSports={selectedSports} setIsLoading={setIsLoading} />
    </div>
  );
};

export default MainHeader;
