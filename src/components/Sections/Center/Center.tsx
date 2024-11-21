import React, { FC } from "react";
import classes from "./Center.module.css";
import AllMatchesContainer from "./AllMatchesContainer/AllMatchesContainer";

interface CenterProps {
  className?: string;
}
const Center: FC<CenterProps> = (props) => {
  const { className } = props;
  const classname = `${className} ${classes.center}`;
  return (
    <div className={classname}>
      <AllMatchesContainer />
    </div>
  );
};

export default Center;
