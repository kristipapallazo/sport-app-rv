import React, { Dispatch, FC, SetStateAction } from "react";
import DateBtn from "../../Button/DateButton";

interface MainHeaderProps {
  sportAllIds: SportAllIds;
  sportById: SportById;
  selSport: SportId;
  setSelectDateModalIsOpen: Dispatch<SetStateAction<boolean>>;
}
interface SportMenuProps {
  sportAllIds: SportAllIds;
  sportById: SportById;
  selSport: SportId;
}

const SportMenu: FC<SportMenuProps> = (props) => {
  const { sportAllIds, sportById, selSport } = props;
  const items = sportAllIds.map((id) => {
    const sportId = Number(id);

    const sportObj = sportById[sportId];
    return (
      <span key={sportId} className={sportId === selSport ? "selected" : ""}>
        {sportObj.name}
      </span>
    );
  });
  return <div className="sport-menu">{items.length > 0 && items}</div>;
};

const MainHeader: FC<MainHeaderProps> = (props) => {
  const { sportAllIds, sportById, selSport, setSelectDateModalIsOpen } = props;
  return (
    <div className="main-header">
      <DateBtn setSelectDateModalIsOpen={setSelectDateModalIsOpen} />
      <SportMenu sportAllIds={sportAllIds} sportById={sportById} selSport={selSport} />
    </div>
  );
};

export default MainHeader;
