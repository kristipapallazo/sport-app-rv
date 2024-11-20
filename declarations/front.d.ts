// import { SetStateAction } from "react";

interface Sport {
  name: string;
  position: number;
}

type SportId = number;
type SportById = {
  [id: SportId]: Sport;
};
type SportAllIds = string[];
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
interface Tour {}
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
  // matchById: object;
  sportSelectedCategAllIds: SportSelectedCategAllIds;
  // tourById: object;
}
interface HeaderMenuItem {
  name: string;
}

// /* global */
// type setStateFn<S> = SetStateAction<S>;
