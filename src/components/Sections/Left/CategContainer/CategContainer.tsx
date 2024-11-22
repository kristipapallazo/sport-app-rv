import { FC } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useCollection from "../../../../hooks/useCollection";
import classes from "./CategContainer.module.css";
import FLAG_ICONS_OBJ from "../../../Icon/FlagIcons";

interface CategContainerProps {}
interface CategMenuProps {}

type MenuItem = Required<MenuProps>["items"][number];
const CategMenu: FC<CategMenuProps> = (props) => {
  const {} = props;
  const { sportSelectedCategAllIds, categById, tourById } = useCollection();

  const sportId = 1;
  const items: MenuItem[] = sportSelectedCategAllIds[sportId].map((categId) => {
    const categ = categById[categId];
    const { name, tourAllIds } = categ;

    const children: MenuItem[] = tourAllIds.map((tourId) => {
      const tour = tourById[tourId];
      const key = `${categId}_${tourId}`;
      const child = { key, label: tour.name };
      return child;
    });
    const icon = FLAG_ICONS_OBJ[name];

    return {
      key: categId,
      label: name,
      icon,
      children,
    };
  });

  const onClick: MenuProps["onClick"] = (info) => {
    console.log("info :>> ", info);
  };

  return (
    <div className={classes["categ-menu"]}>
      <Menu
        items={items}
        onClick={onClick}
        style={{ width: "100%" }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
      />
    </div>
  );
};

interface LiveMenuProps {}
const LiveMenu: FC<LiveMenuProps> = (props) => {
  return <div style={{ flexShrink: 0 }}>live menu</div>;
};

const CategContainer: FC<CategContainerProps> = (props) => {
  const sport = "sport_name";
  return (
    <div className={classes.container}>
      <div className={classes.sportName}>{sport}</div>
      <LiveMenu />
      <CategMenu />
    </div>
  );
};

export default CategContainer;
