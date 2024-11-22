import React, { FC, ReactElement, ReactNode } from "react";
import classes from "./AllMatchesContainer.module.css";
import { match } from "assert";
import useCollection from "../../../../hooks/useCollection";

interface AllMatchesContainerProps {}
interface AllMatchesHeaderProps {
  name: string;
  hasSbv?: boolean;
  isLive?: boolean;
}
interface MatchContentProps {}
const AllMatchesHeader: FC<AllMatchesHeaderProps> = (props) => {
  const { name, hasSbv, isLive } = props;
  const classname = `${classes.header} ${classes.isLive}`;
  return (
    <div className={classname}>
      <span className={classes.headerChild}>{name}</span>
      <span className={classes.headerChild}>{name}</span>
      <span className={classes.headerChild}>{name}</span>
      <span className={classes.headerChild}>btn</span>
    </div>
  );
};

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
const MatchContent: FC<MatchContentProps> = (props) => {
  const {} = props;
  const selectedSport = 1;
  const { sportSelectedCategAllIds, categById, tourById, matchById } = useCollection();
  const classname = `${classes.matchContent}`;
  let items = [] as ReactNode[];
  sportSelectedCategAllIds[selectedSport].slice(0, 2).forEach((categId) => {
    const categ = categById[categId];
    const { name: categName, tourAllIds } = categ;

    tourAllIds.forEach((tourId) => {
      const tour = tourById[tourId];
      const { name: tourName, dateAllIds, dateById } = tour;
      const tourItem = dateAllIds.map((dateId) => {
        const matchAllIds = dateById[dateId];
        const matchList = matchAllIds.map((matchId) => {
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
  return (
    <div className={classes.cont}>
      <AllMatchesHeader name="Sport Live" hasSbv={true} isLive={true} />
      <MatchContent />
    </div>
  );
};

export default AllMatchesContainer;
