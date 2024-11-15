import { FC, FunctionComponent, useEffect, useState } from "react";
import useFMcore from "../../hooks/useFMcore";
import "./Dashboard.css";

interface DashboardPageProps {}

interface HeaderProps {}
const Header: FC<HeaderProps> = (props) => {
  const test: HeaderMenuItem[] = [];
  const items = test.map((i) => {
    return <li>{i.name}</li>;
  });
  return (
    <div id="top-header">
      <div className="menu-container">
        <ul>{items}</ul>
      </div>
    </div>
  );
};

const DashboardPage: FunctionComponent<DashboardPageProps> = ({}) => {
  const [tempStore, setTempStore] = useState<any>({});
  const [tempStoreLive, setTempStoreLive] = useState<any>({});
  const [selSport, setSelSport] = useState<number>(1);
  const context = useFMcore();
  const store = {
    availableDates: [],
    availableTimes: ["all", "1h", "2h", "3h", "6h", "12h"],
    categById: {},
    marketAllIds: {},
    marketById: {},
    marketGroups: [],
    matchById: {},
    sportAllIds: [],
    sportById: {},
    sportSelectedAllIds: [],
    sportSelectedCategAllIds: {},
    tourById: {},
  };
  const storeLive = {
    categById: {},
    marketAllIds: {},
    marketById: {},
    matchById: {},
    marketGroups: [],
    sportAllIds: [],
    sportById: {},
    sportSelectedAllIds: [],
    sportSelectedCategAllIds: {},
    tourById: {},
  };

  useEffect(() => {
    const init = async () => {
      const res = await context.FMcore.Sport.getSportCollection(1);
      if (!res) return;
      const { tempStore, tempStoreLive } = res;
      setTempStore(tempStore);
      setTempStoreLive(tempStoreLive);
    };
    init();
  }, [context]);

  return (
    <>
      <Header />
      {tempStore.sportAllIds && (
        <div className="sport-menu">
          {tempStore.sportAllIds.map((sport: any) => {
            console.log("sport :>> ", sport);
            const sportObj = tempStore?.sportById[sport];
            return <span className={sport === selSport ? "selected" : ""}>{sportObj.name}</span>;
          })}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
