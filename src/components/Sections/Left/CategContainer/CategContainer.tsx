import { FC, useEffect } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useCollection from "../../../../hooks/useCollection";
import classes from "./CategContainer.module.css";
import FLAG_ICONS_OBJ from "../../../Icon/FlagIcons";
import useMainCtx from "../../../../hooks/useMainCtx";
import { upperCase } from "lodash";
import SPORT_ICONS_OBJ from "../../../Icon/SportIcon";
import { IoMdTime } from "react-icons/io";

interface CategContainerProps {}
interface CategMenuProps {}

type MenuItem = Required<MenuProps>["items"][number];

const categMenuItem = (sportId: SportId, bootstrap: Bootstrap, l: "live" | "prematch") => {
  const { sportSelectedCategAllIds, categById, tourById } = bootstrap;

  console.log("bootstrap, l :>> ", bootstrap, l);
  console.log("sportSelectedCategAllIds :>> ", sportSelectedCategAllIds);

  // const sportObj = sportById[sportId];
  // const { name } = sportObj;
  // const label = upperCase(name);
  // const icon = SPORT_ICONS_OBJ[name];

  const children = sportSelectedCategAllIds[sportId].map((categId) => {
    const categ = categById[categId];
    const { name, tourAllIds } = categ;

    const key = `${sportId}_${l}_${categId}`;
    /* Todo: tourAllIds could be undefinded, solve it */
    const children: MenuItem[] = tourAllIds!.map((tourId) => {
      const tour = tourById[tourId];
      if (!tour) alert(`${l} ${categId}, ${tourId}`);

      const childKey = `${key}_${tourId}`;

      const child = { key: childKey, label: tour?.name || "xxxxxxxxxxx" };
      return child;
    });

    return {
      key,
      label: name,
      icon: FLAG_ICONS_OBJ[name],
      children: children,
    };
  });

  return children;
  // return {
  //   key: sportId,
  //   label,
  //   icon,
  //   children,
  // };
};

const CategMenu: FC<CategMenuProps> = (props) => {
  const { selectedSports } = useMainCtx();
  const store = useCollection()!;
  const { sportList } = store;
  console.log("store, selectedSports", store, selectedSports);

  const items: MenuItem[] = selectedSports.map((sportId) => {
    const fullBootstrap = store[sportId];
    console.log("store", store);
    console.log("fullBootstrap", fullBootstrap);
    // const { p, l } = fullBootstrap;

    const sportObj = sportList.sportById[sportId];
    const { name, hasLive, hasPrematch } = sportObj;
    const label = upperCase(name);
    const icon = SPORT_ICONS_OBJ[name];

    const liveChildren = fullBootstrap?.l ? categMenuItem(sportId, fullBootstrap.l, "live") : [];
    const prematchChildren = fullBootstrap?.p ? categMenuItem(sportId, fullBootstrap.p, "prematch") : [];

    const liveItem: MenuItem = { key: `${sportId}_live`, label: "Live", icon: <IoMdTime />, children: liveChildren };
    const prematchItem: MenuItem = { key: `${sportId}_prematch`, label: "Prematch", children: prematchChildren };

    const children: MenuItem[] = [];

    if (hasLive) children.push(liveItem);
    if (hasPrematch) children.push(prematchItem);

    // if (fullBootstrap) return categMenuItem(sportId, fullBootstrap);
    // return null;

    return { key: sportId, label, icon, children };
  });

  const onClick: MenuProps["onClick"] = (info) => {
    console.log("info :>> ", info);
  };

  useEffect(() => {
    console.log("inside categ comp uef");
  }, []);

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
