import { FC, useEffect } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useCollection from "../../../../hooks/useCollection";
import classes from "./CategContainer.module.css";
import FLAG_ICONS_OBJ from "../../../Icon/FlagIcons";
import useMainCtx from "../../../../hooks/useMainCtx";
import { upperCase } from "lodash";
import SPORT_ICONS_OBJ from "../../../Icon/SportIcon";

interface CategContainerProps {}
interface CategMenuProps {}

type MenuItem = Required<MenuProps>["items"][number];

const categMenuItem = (sportId: SportId, bootstrap: Bootstrap) => {
  const { sportSelectedCategAllIds, categById, tourById, sportById } = bootstrap;

  console.log("sportSelectedCategAllIds :>> ", sportSelectedCategAllIds);

  const sportObj = sportById[sportId];
  const { name } = sportObj;
  const label = upperCase(name);
  const icon = SPORT_ICONS_OBJ[name];

  const children: MenuItem[] = sportSelectedCategAllIds[sportId].map((categId) => {
    const categ = categById[categId];
    const { name, tourAllIds } = categ;

    /* Todo: tourAllIds could be undefinded, solve it */
    const children: MenuItem[] = tourAllIds!.map((tourId) => {
      const tour = tourById[tourId];
      if (!tour) alert(`${categId}, ${tourId}`);

      const key = `${categId}_${tourId}`;

      const child = { key, label: tour.name };
      return child;
    });

    return {
      key: categId,
      label: name,
      icon: FLAG_ICONS_OBJ[name],
      children,
    };
  });

  return {
    key: sportId,
    label,
    icon,
    children,
  };
};

const CategMenu: FC<CategMenuProps> = (props) => {
  const { selectedSports } = useMainCtx();
  const store = useCollection()!;

  const items: MenuItem[] = selectedSports.map((sportId) => {
    const bootstrap = store[sportId];
    console.log("store", store);
    console.log("bootstrap", bootstrap);
    if (bootstrap) return categMenuItem(sportId, bootstrap);
    return null;
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
