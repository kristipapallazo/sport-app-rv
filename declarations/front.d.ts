// import { SetStateAction } from "react";

interface Sport {
  name: string;
  position: number;
}

type SportId = number;
type SportById = {
  [id: SportId]: Sport;
};
type SportAllIds = SportId[];
type SportSelectedAllIds = SportId[];

type OutcomeId = string;
interface OutcomeTest {
  position: number;
  name: string;
  code: string;
}
interface OutcomeById {
  [id: OutcomeId]: OutcomeTest;
}
type OutcomeAllIds = string[];

type MarketId = number;
interface MarketTest {
  position: number;
  name: string;
  hasSbv: boolean;
  shortName?: string;
  longName?: string;
  spec?: number | string[];
  src?: number;
  outcType?: string;
  parlay?: number;
  type?: string;
  outcomeById?: OutcomeById;
  outcomeAllIds?: OutcomeAllIds;
  description?: string;
}
interface MarketById {
  [id: MarketId]: MarketTest;
}
type MarketIds = string[];
interface MarketAllIds {
  [sportId: SportId]: MarketIds;
}

interface MarketGroup {
  name: string;
  markets: MarketId[];
}

type MarketGroups = MarketGroup[];

type AvailableDates = string[];
type CategId = number;
type CategsAllIds = CategId[];
interface SportSelectedCategAllIds {
  [sportId: SportId]: CategsAllIds;
}

type TourId = number;
type TourAllIds = TourId[];

type DateAllIds = string[];
interface DateObj {}
interface DateById {
  [dateId: string]: MatchAllIds;
}
interface Tour {
  name: string;
  pos: number;
  dateAllIds: DateAllIds;
  dateById: DateById;
  groupId: number | null;
  categId: CategId;
  matchAllIds: MatchAllIds;
}
interface TourById {
  [tourId: TourId]: Tour;
}

interface Categ {
  name: string;
  flag: string;
  pos: number;
  tourAllIds: TourAllIds;
}
interface CategById {
  [categId: CategId]: Categ;
}

type MatchId = string;
type MatchAllIds = MatchId[];
interface MatchTest {
  home: string;
  away: string;
  categId: number;
  code?: string | number;
  date: string;
  extra: { s_id: string };
  feeds?: any;
  groupId?: number;
  live: number;
  timestamp: number | string;
  sportId: number;
  tourId: number;
  time: string;
  link?: string;
  cloneId?: string;
  sid?: any;
  map: any;
}
interface MatchById {
  [matchId: MatchId]: MatchTest;
}
interface Collection {
  sportById: SportById;
  sportAllIds: SportAllIds;
  sportSelectedAllIds: SportSelectedAllIds;
  availableDates: AvailableDates;
  // availableTimes: string[];
  categById: CategById;
  marketAllIds: MarketAllIds;
  marketById: MarketById;
  marketGroups: MarketGroups;
  matchById: MatchById;
  sportSelectedCategAllIds: SportSelectedCategAllIds;
  tourById: TourById;
}
interface HeaderMenuItem {
  name: string;
}

interface SportListDestructed {
  sportById: SportById;
  sportAllIds: SportAllIds;
}
interface GlobalStore {
  [sportId: SportId]: FullBootstrap;
  sportList: SportListDestructed;
}

// /* global */
type SetStateFn<S> = SetStateAction<S>;
