import React, { FC } from "react";
import classes from "./AllMatchesContainer.module.css";

interface AllMatchesContainerProps {}
interface AllMatchesHeaderProps {
  name: string;
  hasSbv?: boolean;
  isLive?: boolean;
}
const AllMatchesHeader: FC<AllMatchesHeaderProps> = (props) => {
  const { name, hasSbv, isLive } = props;
  const classname = `${classes.header} ${classes.isLive}`;
  return (
    <div className={classname}>
      <span className={classes.headerChild}>{name}</span>
      <span className={classes.headerChild}>{name}</span>
      <span className={classes.headerChild}>{name}</span>
      <span className={classes.headerChild}>btn</span>
    </div>
  );
};

const AllMatchesContainer: FC<AllMatchesContainerProps> = (props) => {
  return (
    <div className={classes.cont}>
      <AllMatchesHeader name="Sport Live" hasSbv={true} isLive={true} />
    </div>
  );
};

export default AllMatchesContainer;
