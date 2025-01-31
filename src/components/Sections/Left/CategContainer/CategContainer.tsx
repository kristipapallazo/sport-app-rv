import { FC, useEffect } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useCollection, { useMainCtx } from "../../../../hooks/useCollection";
import classes from "./CategContainer.module.css";
import FLAG_ICONS_OBJ from "../../../Icon/FlagIcons";

interface CategContainerProps {
  sportId: SportId;
}
interface CategMenuProps {
  sportId: SportId;
}

type MenuItem = Required<MenuProps>["items"][number];
const CategMenu: FC<CategMenuProps> = (props) => {
  const { sportId } = props;
  const { sportSelectedCategAllIds, categById, tourById } = useCollection()!;

  // const { sportId } = useMainCtx();

  console.log("sportId :>> ", sportId);
  console.log("sportSelectedCategAllIds :>> ", sportSelectedCategAllIds);

  const items: MenuItem[] = sportSelectedCategAllIds[sportId].map((categId) => {
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
  const { sportId } = props;
  const sport = "sport_name";
  return (
    <div className={classes.container}>
      <div className={classes.sportName}>{sport}</div>
      <LiveMenu />
      <CategMenu sportId={sportId} />
    </div>
  );
};

export default CategContainer;
