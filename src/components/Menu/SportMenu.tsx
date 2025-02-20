import { FC, useMemo } from "react";
import useCollection from "../../hooks/useCollection";
import { Badge, Menu, type MenuProps } from "antd";
import { upperCase } from "lodash";
import SPORT_ICONS_OBJ from "../Icon/SportIcon";

type MenuItem = Required<MenuProps>["items"][number];

interface SportMenuProps {
  selectedSports: SportAllIds;
  setSelectedSports: SetStateFn<SportAllIds>;
  setIsLoading: SetStateFn<boolean>;
}

const SportMenu: FC<SportMenuProps> = (props) => {
  const { selectedSports, setSelectedSports, setIsLoading } = props;
  const { sportList } = useCollection()!;
  const { sportById, sportAllIds } = sportList!;

  const memoizedSelectedKeys = useMemo(() => selectedSports.map((sport) => sport.toString()), [selectedSports]);

  const items: MenuItem[] = sportAllIds.map((id) => {
    const sportObj = sportById[id];
    const { name, hasLive } = sportObj;

    const label = (
      <Badge count={hasLive ? 1 : null}>
        <span>{upperCase(name)}</span>
      </Badge>
    );
    const icon = SPORT_ICONS_OBJ[name];

    return { key: id, label, icon };
  });

  const onClick: MenuProps["onClick"] = ({ key: stringKey }) => {
    const key = +stringKey;
    setIsLoading(true);
    setSelectedSports((prev: SportAllIds) => [...prev, key]);
  };

  const onDeselect: MenuProps["onDeselect"] = ({ selectedKeys }) => {
    setIsLoading(true);
    setSelectedSports(selectedKeys.map((k) => +k));
  };

  return (
    <div className="sport-menu">
      <Menu
        items={items}
        selectedKeys={memoizedSelectedKeys}
        onClick={onClick}
        mode="horizontal"
        multiple
        onDeselect={onDeselect}
      />
    </div>
  );
};

export default SportMenu;
