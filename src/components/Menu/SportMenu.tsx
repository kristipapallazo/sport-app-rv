import { FC } from "react";
import useCollection from "../../hooks/useCollection";
import { Menu, type MenuProps } from "antd";
import { upperCase } from "lodash";
import SPORT_ICONS_OBJ from "../Icon/SportIcon";

type MenuItem = Required<MenuProps>["items"][number];

interface SportMenuProps {
  selSport: SportId;
}

const SportMenu: FC<SportMenuProps> = (props) => {
  const { selSport } = props;
  const { sportById, sportAllIds } = useCollection();

  const selectedKeys = [selSport.toString()];

  const items: MenuItem[] = sportAllIds.map((id) => {
    const sportObj = sportById[id];
    const { name } = sportObj;
    const label = upperCase(name);
    const icon = SPORT_ICONS_OBJ[name];

    //   <span key={sportId} className={sportId === selSport ? "selected" : ""}>
    return { key: id, label, icon };
  });

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    // setCurrent(e.key);
  };

  return (
    <div className="sport-menu">
      <Menu items={items} selectedKeys={selectedKeys} onClick={onClick} mode="horizontal" />
    </div>
  );
};

export default SportMenu;
