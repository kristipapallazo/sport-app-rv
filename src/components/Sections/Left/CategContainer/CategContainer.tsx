import { FC } from "react";
import classes from "./CategContainer.module.css";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import useCollection from "../../../../hooks/useCollection";

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

    return {
      key: categId,
      label: name,
      icon: false,
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
        style={{ width: 256 }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
      />
    </div>
  );
};

const CategContainer: FC<CategContainerProps> = (props) => {
  const {} = props;
  const sport = "update it";
  return (
    <div className={classes.container}>
      <div style={{ flexShrink: 1 }}>{sport}</div>
      <CategMenu />
    </div>
  );
};

export default CategContainer;
