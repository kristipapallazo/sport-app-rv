import { Button } from "antd";
import React, { FC } from "react";
import classes from "./AppHeader.module.css";

interface AppHeaderProps {}
interface SelectAppMenuProps {}
interface AppConfigMenuProps {}
const SelectAppMenu: FC<SelectAppMenuProps> = (props) => {
  const apps = ["SPORT", "LIVE", "CASINO-TT"].map((app) => {
    return <Button>{app}</Button>;
  });
  return <div>{apps}</div>;
};
const AppConfigMenu: FC<AppConfigMenuProps> = (props) => {
  return <div>config menu</div>;
};

const AppHeader: FC<AppHeaderProps> = (props) => {
  return (
    <header className={classes.appHeader}>
      <SelectAppMenu />
      <AppConfigMenu />
    </header>
  );
};

export default AppHeader;
