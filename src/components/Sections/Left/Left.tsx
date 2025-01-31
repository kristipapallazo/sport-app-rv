import React, { FC } from "react";
import classes from "./Left.module.css";
import SearchContainer from "./SearchContainer/SearchContainer";
import CategContainer from "./CategContainer/CategContainer";

interface LeftProps {
  className?: string;
  sportId: SportId;
}

const Left: FC<LeftProps> = (props) => {
  const { sportId } = props;
  const { className } = props;
  const classname = `${className} ${classes.left}`;
  return (
    <div className={classname}>
      <SearchContainer /> <CategContainer sportId={sportId} />
    </div>
  );
};

export default Left;
