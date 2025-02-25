import React, { FC } from "react";
import classes from "./Center.module.css";
import AllMatchesContainer from "./AllMatchesContainer/AllMatchesContainer";
import AllMatchesHeader from "./AllMatchesHeader/AllMatchesHeader";

interface CenterProps {
  className?: string;
}
const Center: FC<CenterProps> = (props) => {
  const { className } = props;

  const classname = `${className} ${classes.center}`;

  return (
    <div className={classname}>
      <AllMatchesHeader name="Sport Live" hasSbv={true} isLive={true} />
      <AllMatchesContainer />
    </div>
  );
};

export default Center;
