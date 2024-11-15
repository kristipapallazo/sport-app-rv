type DomainConfigs = {
  haUrl: string | undefined;
  languages: string;
  [index: string]: string | number | undefined;
};
type UserParameters = {
  username?: string;
  auth_services: any;
  auth_services_hi: any;
  [index: string]: string | number;
};
type MngParameters = {
  username?: string;
  [index: string]: any;
};
type UserStore = {
  username?: string;
  parameters: UserParameters;
  parameters_new: MngParameters;
  currencies: { [index: number]: string };
  [index: string]: string | number | undefined | object;
};
type SportStore = {
  sportAllIds: number[];
  sportById: { [index: number]: { name: string; pos: number } };
  sportSelectedAllIds: number[];
  marketGroups: any;
  marketById: { [index: string]: Market };
  marketAllIds: any;
  marketMaps?: any;
  marketTranslation?: any;
  matchById?: { [index: string]: Match };
};
type Market = {
  pos: number;
  name: string;
  shortName?: string;
  longName?: string;
  hasSbv: boolean;
  spec?: number | string[];
  src?: string;
  outcType?: string;
  parlay?: number;
  type?: string;
  outcomeById?: Outcome;
  outcomeAllIds?: number[] | string[];
  description?: string;
};
type Outcome = {
  [index: string]: {
    pos: number;
    name: string;
  };
};
type Match = {
  timestamp: number;
  home: string;
  away: string;
  code: string | number | undefined;
  sportId: number;
  categId: number;
  groupId: number | undefined;
  tourId: number;
  live: number;
  extra: any;
  date: string;
  time: string;
  link?: string;
  cloneId?: string;
  feeds?: any;
  sid?: any;
};
type RawStore = { [index: string]: any };

interface Boot {
  checkDomain(): void;
  selectHaUrl(): string;
}

type CollectionFeedType = "sports" | "categs" | "tours" | "markets" | "outcomes";
type CollectionMapType = "sports" | "tours" | "markets" | "feed-clears";
interface CollectionParams {
  [key: string]: string;
}
interface Sport {
  id: number;
  name: string;
  pos: number;
  hasLive?: boolean;
  hasPrematch?: boolean;
}

interface SportMatch {
  id: string;
  home: string;
  away: string;
  startTime: number;
  sportId: number;
  categId: number;
  groupId: number;
  tourId: number;
  isLive: boolean;
  code?: string;
  sid?: string[];
}

interface SportCateg {
  id: number;
  name: string;
  pos: number;
  sportId: number;
  cc?: string;
}

interface SportTour {
  id: number;
  name: string;
  pos: number;
  categId: number;
  sportId: number;
}

interface IAdmin {
  testAdmin(): void;
  getActiveSports(live: number): Promise<ApiResponseType>;
  getActiveEvents(sportId: number, live: number): Promise<ApiResponseType>;
  getEventOddsRaw(eventId: string): Promise<ApiResponseTypeOdds>;
  getTranslations(type: string, filter: string, lang: string): Promise<ApiResponseType>;
  setTranslations(type: string, filter: string, lang: string, data: any): Promise<ApiResponseType>;
  Collection: ICollection;
  FeedCollection: IFeedCollection;
  MapCollection: IMapCollection;
}

interface MarketDto {
  name: string;
  pos: number;
  spec: 0 | 1;
  state: 0 | 1;
  extra?: string;
}

interface OutcomeDto {
  marketId: number;
  name: string;
  pos: number;
  checkBet?: string;
  clear?: string;
}

interface MapDto {
  id: number;
  feed: number;
  feedId: string;
  del?: number;
}

interface MapMarketDto {
  id: number;
  sportId: number;
  feed: number;
  feedId: string;
  outcomes: any;
  del?: number;
}

interface Configuration {
  [level: string]: any;
}

interface MergedConfiguration {
  model: number;
  type: ConfigurationType;
  id: number;
  config: Configuration;
  merged: Configuration;
}

interface SportMarketOdd {
  specs: { [spec: string]: SportSpec };
  sidp?: number;
}
interface SportSpec {
  outcomes: { [outcomeId: string]: SportOdd };
  state?: number;
}

interface SportOdd {
  value: number;
  state: number;
  pos?: number;
  name?: string;
  prob?: number;
}

interface ICollection {
  getSports(): Promise<ApiResponseType>;
  getCategs(sportId: string): Promise<ApiResponseType>;
  getGroups(sportId: string): Promise<ApiResponseType>;
  getTours(categId: string): Promise<ApiResponseType>;
  getToursFromGroup(groupId: string): Promise<ApiResponseType>;
  getMarkets(sportId: number): Promise<ApiResponseType>;
  setMarket(id: string, data: MarketDto): Promise<ApiResponseType>;
  rollMarket(sportId: number, id: string): Promise<ApiResponseType>;
  addMarket(data: MarketDto): Promise<ApiResponseType>;
  getOutcomes(marketId: string): Promise<ApiResponseType>;
  setOutcome(id: string, data: OutcomeDto): Promise<ApiResponseType>;
  addOutcome(data: OutcomeDto): Promise<ApiResponseType>;
  deleteOutcome(id: string): Promise<ApiResponseType>;
  getMarketsChanges(sportId: string): Promise<ApiResponseType>;
}

interface IFeedCollection {
  getSports(feedId: string): Promise<ApiResponseType>;
  getCategs(feedId: string, sportId: string): Promise<ApiResponseType>;
  getTours(feedId: string, categId: string): Promise<ApiResponseType>;
}

interface IMapCollection {
  getSports(): Promise<ApiResponseType>;
  setSport(data: MapDto): Promise<ApiResponseType>;
  getTours(feed: string, sportId: string, feedSportId: string): Promise<ApiResponseType>;
  setTour(data: MapDto): Promise<ApiResponseType>;
  getMarkets(sportId: string, feed?: string): Promise<ApiResponseType>;
  getMarkets(sportId: string, feed?: string): Promise<ApiResponseType>;
  setMarket(data: MapMarketDto): Promise<ApiResponseType>;
}

type ApiResponseType = {
  error: boolean;
  message?: string;
  data?: any;
};

interface ApiResponseTypeOdds extends ApiResponseType {
  data: { [marketId: string]: SportMarketOdd };
}

interface ISport {
  getSportCollection(sportId: number): any;
  attachEventListener(): void;
  updateBetslipStore(action?: any): void;
  clearBetslip(): void;
  initApp(): void;
  getVirtualUrl(param: getVirtualUrlParam): Promise<ApiResponseType>;
  Collection: ICollection;
  /* TODO: check later for the return type of the upper fn */
}
interface FMcore {
  init(): Promise<void>;
  login(username: string, password: string, saveDevice?: boolean): Promise<ApiResponseType>;
  logout(): void;
  getUser(): any;
  setApp(app: string): Promise<void>;
  Admin: IAdmin;
  Sport: ISport;
  // Boot?: Boot;
  // Add additional methods and properties here
}

interface Window {
  gStore: any;
  FMcore: FMcore;
}
