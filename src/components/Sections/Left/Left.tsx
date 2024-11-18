import React, { FC } from "react";
import classes from "./Left.module.css";
import SearchContainer from "./SearchContainer/SearchContainer";
import CategContainer from "./CategContainer/CategContainer";

interface LeftProps {
  className?: string;
}

const Left: FC<LeftProps> = (props) => {
  const { className } = props;
  const classname = `${className} ${classes.left}`;
  return (
    <div className={classname}>
      <SearchContainer /> <CategContainer />
    </div>
  );
};

export default Left;
