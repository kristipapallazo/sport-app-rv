import { FC } from "react";

import classes from "./AllMatchesHeader.module.css";

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
      <span className={classes.headerChild}>mg</span>
      <span className={classes.headerChild}>mg</span>
      <span className={classes.btn}>filter</span>
    </div>
  );
};

export default AllMatchesHeader;
