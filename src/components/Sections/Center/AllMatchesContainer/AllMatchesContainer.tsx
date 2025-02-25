import React, { FC, ReactNode } from "react";

import useCollection from "../../../../hooks/useCollection";

import classes from "./AllMatchesContainer.module.css";
import useMainCtx from "../../../../hooks/useMainCtx";

interface AllMatchesContainerProps {}

interface MatchSectionProps {
  children: ReactNode;
  center?: boolean;
  className?: string;
}
const MatchSection: FC<MatchSectionProps> = (props) => {
  const { children, center = true, className } = props;
  const classname = `${classes.matchSection} ${center ? classes.center : ""} ${className ? classes[className] : ""}`;
  return (
    <span style={className !== "teamNamesSection" ? { flex: 1 } : {}} className={classname}>
      {children}
    </span>
  );
};

interface MatchContentProps {
  bootstrap: Bootstrap;
  sportId: SportId;
  live: LiveState;
}
const MatchContent: FC<MatchContentProps> = (props) => {
  const { bootstrap, sportId, live } = props;
  const { sportSelectedCategAllIds, categById, tourById, matchById } = bootstrap;
  console.log("bootstrap", bootstrap);
  const categAllIds = sportSelectedCategAllIds[sportId];

  const classname = `${classes.matchContent}`;
  let items: ReactNode[] = [];

  categAllIds.slice(0, 2).forEach((categId) => {
    const categ = categById[categId];
    const { name: categName, tourAllIds } = categ;

    /* Todo: tourAllIds could be undefinded, solve it */
    tourAllIds!.forEach((tourId) => {
      const tour = tourById[tourId];
      const { name: tourName, dateAllIds, dateById } = tour;
      const tourItem = dateAllIds.map((dateId) => {
        const matchAllIds = live === "live" ? tour.matchAllIds : dateById[dateId];
        const matchList = matchAllIds?.map((matchId) => {
          const match = matchById[matchId];
          const { home, away, time } = match;
          return (
            <div key={matchId} className={classes.match}>
              <MatchSection className="timeSection" center={false}>
                <span>{time}</span>
                <span>{matchId}</span>
              </MatchSection>
              <MatchSection className="teamNamesSection" center={false}>
                <span>{home}</span>
                <span>{away}</span>
              </MatchSection>
              <MatchSection>odd</MatchSection>
              <MatchSection>odd</MatchSection>
              <MatchSection>odd</MatchSection>
              <MatchSection>...</MatchSection>
            </div>
          );
        });

        const key = `${dateId}:${categId}:${tourId}`;
        return (
          <div key={key} className={classes.tourCont}>
            <header className={classes.tourHeader}>
              <span>{dateId}</span>
              <span>{`${categId}/${tourId}`}</span>
              <span>{`${categName}/${tourName}`}</span>
            </header>
            <div className={classes.matchList}>{matchList}</div>
          </div>
        );
        // const tourItem = tourAllIds.map((tourId) => {});
      });
      items = [...items, ...tourItem];
    });
  });

  return <div className={classname}>{items}</div>;
};

const AllMatchesContainer: FC<AllMatchesContainerProps> = (props) => {
  const { selectedSports } = useMainCtx();
  const store = useCollection()!;

  const {
    sportList: { sportById },
  } = store;

  const sportMatchContainers = selectedSports.map((sportId) => {
    const sportName = sportById[sportId].name;
    const liveStateArr: LiveState[] = ["live", "prematch"];

    return (
      <div key={sportId}>
        {liveStateArr.map((live) => {
          const bootstrap = live === "live" ? store[sportId].l : store[sportId].p;
          return (
            <div key={`${sportId}_${live}`} style={{ position: "relative" }}>
              <div style={{ position: "sticky", top: 0 }}>
                <span>{sportName}</span>
                <span>{live}</span>
              </div>
              <MatchContent bootstrap={bootstrap} sportId={sportId} live={live} />
            </div>
          );
        })}
      </div>
    );
  });
  return <div className={classes.cont}>{sportMatchContainers}</div>;
};

export default AllMatchesContainer;
