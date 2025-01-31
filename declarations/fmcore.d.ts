type DomainConfigs = {
  haUrl?: string | undefined;
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
  id: eve;
  home: string;
  away: string;
  startTime: number;
  sportId: SportId;
  categId: CategId;
  categName: string;
  groupId: number;
  tourId: number;
  tourName: string;
  isLive: boolean;
  code?: string;
  sid?: string[];
  map?: { [index: string]: any };
  /* extra props */
  live: number;
  timestamp: number;
  date: string;
  time: string;
  feeds: any;
  extra: { s_id: string };
}

interface SportCateg {
  id: number;
  name: string;
  pos: number;
  sportId: number;
  hasLive?: boolean;
  hasPrematch?: boolean;
  cc?: string;
  flag?: boolean; //same as cc, structure compatibility
  tourAllIds?: TourAllIds; //structure compatibility
}

interface SportTour {
  id: number;
  name: string;
  pos: number;
  sportId: number;
  categId: number;
  groupId: number;
  hasLive?: boolean;
  hasPrematch?: boolean;
  dateAllIds: DateAllIds;
  dateById: DateById;
  matchAllIds: MatchAllIds;
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
  configId?: string;
}

interface SportMarketOdd {
  specs: { [spec: string]: SportSpec };
  sidp?: number | string;
}
interface SportMarketOddCalculated {
  specs: { [spec: string]: SportSpecCalculated };
  state?: number;
  sidp?: number | string;
  mbSbv?: string;
}

interface SportSpec {
  outcomes: { [outcomeId: string]: SportOdd };
  state?: number;
  lastStop?: number;
}

interface SportSpecCalculated {
  outcomes: { [outcomeId: string]: SportOddCalculated };
  state?: number;
}

interface SportOdd {
  value: number;
  state: number;
  pos?: number;
  name?: string;
  prob: number;
}

interface SportOddCalculated {
  value: number | null;
  state: number;
}

type RegisterDataType = {
  sportId: string;
  tourId: string;
  feedId: number;
  feedSportId: number;
  live: number;
  matches: string[];
  bmId?: string;
  mf?: string;
};

type MapEventDataType = {
  sportId: string;
  sourceId: string;
  feedId: number;
  feedSportId: number;
  live: number;
  eventId: string;
  bmId?: string;
  mf: string;
};

type UnregisterDataType = {
  sportId: string;
  live: number;
  matches: string[];
};

interface getVirtualUrlParam {
  /* TODO: define proper types later */
  username: any;
  currency: any;
  loginType: any;
  token: any;
}

interface IAdmin {
  testAdmin(): void;
  setSportModels(sportModels: number[]): ApiResponseType;
  getActiveSports(live: number, shard?: string): Promise<ApiResponseType>;
  getActiveEvents(sportId: number, live: number, shard?: string): Promise<ApiResponseType>;
  getActiveMarkets(sportId: number, lang: string): Promise<ApiResponseType>;
  getActiveCategs(sportId: number, live: number): ApiResponseType;
  getActiveTours(categId: number, live: number): ApiResponseType;
  getEventOddsRaw(eventId: string): Promise<ApiResponseTypeOdds>;
  // getEventOdds(eventId: string): Promise<ApiResponseTypeOdds>;
  getMarketConfig(eventId: string, marketId: string): Promise<ApiResponseType>;
  getFeedActiveSports(feedId: string, live?: number): Promise<ApiResponseType>;
  getFeedActiveEvents(feedId: string, sportId: number, live: number): Promise<ApiResponseType>;
  getFeedActiveCategs(feedId: string, sportId: number, live: number): ApiResponseType;
  getFeedActiveTours(feedId: string, categId: number, live: number): ApiResponseType;
  getTranslations(type: string, filter: string, lang: string): Promise<ApiResponseType>;
  setTranslations(type: string, filter: string, lang: string, data: any): Promise<ApiResponseType>;
  getUserParameters(username: string): Promise<ApiResponseType>;
  getMarketFilters(sportId: string): Promise<ApiResponseType>;
  setMarketFilters(
    id: number,
    sportId: string,
    name: string,
    markets: number[],
    tags: string[],
    functions: string[],
  ): Promise<ApiResponseType>;
  addMarketFilters(
    sportId: string,
    name: string,
    markets: number[],
    tags: string[],
    functions: string[],
  ): Promise<ApiResponseType>;
  removeMarketFilters(id: number, sportId: string): Promise<ApiResponseType>;
  registerMatches(shard: string, data: RegisterDataType): Promise<ApiResponseType>;
  unregisterMatches(shard: string, data: UnregisterDataType): Promise<ApiResponseType>;
  mapMatch(shard: string, data: MapEventDataType): Promise<ApiResponseType>;
  Collection: ICollection;
  FeedCollection: IFeedCollection;
  MapCollection: IMapCollection;
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
  getSportParameters(id: string): Promise<ApiResponseType>;
  deleteSportParameter(model: string, type: string, typeId: string, marketId: string): Promise<ApiResponseType>;
}

interface IFeedCollection {
  getSports(feedId: string): Promise<ApiResponseType>;
  getCategs(feedId: string, sportId: string): Promise<ApiResponseType>;
  getTours(feedId: string, sportId: string, categId: string): Promise<ApiResponseType>;
  getMarkets(feedId: string, sportId: string): Promise<ApiResponseType>;
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
  data: { odds: { [marketId: string]: SportMarketOdd }; meta: { [index: string]: any } };
}

interface FMcore {
  init(): Promise<void>;
  login(username: string, password: string, saveDevice?: boolean): Promise<ApiResponseType | void>;
  logout(): void;
  getUser(): any;
  setApp(app: string): Promise<void>;
  getDomainConfigs(): Promise<DomainConfigs>;
  Admin?: IAdmin;
  Interface?: IInterface;
  // Boot?: Boot;
  // Add additional methods and properties here
}

interface Window {
  gStore: any;
  FMcore: FMcore;
}

/* new */

type SportList = Sport[];
type Live = 0 | 1;
type SportId = number;
type CategId = number;
type TourId = number;
type MarketId = string;
type EventId = string;
interface SportById {
  [sportId: SportId]: Sport;
}
type SportAllIds = SportId[];

interface Bootstrap extends EventCollectionOldModel {
  sportById: SportById;
  sportAllIds: SportAllIds;
  sportSelectedAllIds: SportAllIds;
}
interface ISportListManager {
  addSport(live: number, id: number, name: string, pos: number): void;
  loadSports(): Promise<void>;
  getSports(live?: number, ignoreCache?: boolean): Promise<Sport[]>;
  getSportsFetchKeys(shard?: string): string[];
}

interface CategById {
  [categId: CategId]: SportCateg;
}
interface TourById {
  [tourId: TourId]: SportTour;
}
interface MarketTr {
  description?: string;
  longName?: string;
  shortName?: string;
}
interface MarketById {
  [marketId: MarketId]: Market;
}
interface MarketTrById {
  [marketId: MarketId]: MarketTr;
}
interface DateById {
  [dateId: string]: MatchAllIds;
}
type DateAllIds = string[];
type CategAllIds = CategId[];
type TourAllIds = TourId[];
type MarketAllIds = MarketId[];
type OldStructureMarketAllIds = { [sportId: SportId]: MarketAllIds };
type Categs = (SportCateg | undefined)[];
type AllTours = (SportTour | undefined)[];
type Events = SportMatch[];

type EventAllIds = EventId[];
interface EventById {
  [eventId: EventId]: SportMatch;
}

interface SportMarkets {
  [sportId: SportId]: MarketById;
}
/* translation */
interface SportMarketsTr {
  [sportId: SportId]: MarketTrById;
}

interface EventCollection {
  categs: Categs;
  categAllIds: CategAllIds;
  allTours: AllTours;
  events: Events;
  // markets: MarketById;
  // marketTranslation: MarketTrById;
  availableDates: DateAllIds;
}

interface SportSelectedCategAllIds {
  [sportId: SportId]: CategAllIds;
}
interface EventCollectionOldModel {
  categById: CategById;
  tourById: TourById;
  sportSelectedCategAllIds: SportSelectedCategAllIds;
  allMatches: EventAllIds;
  matchById: EventById;
  availableDates: DateAllIds;
  marketAllIds: OldStructureMarketAllIds;
  marketById: MarketById;
  marketGroups?: any;
  marketTranslation: MarketTrById;
}

/* betslip */
type BetId = string;
interface BetObj {
  marketId: MarketId;
  marketName: string;
  marketResult: any;
  sbvId: any;
  outcomeId: any;
  outcomeName: string;
  odd: any;
  sidp: number | string;
}
interface BetById {
  [betId: BetId]: BetObj;
}
type BetAllIds = BetId[];
interface BetslipMatch extends Pick<SportMatch, "home" | "away" | "code" | "live"> {
  betAllIds: BetAllIds;
  betById: BetById;
  state?: number;
}
interface BetslipMatchById {
  [matchId: EventId]: BetslipMatch;
}
interface InternalBetslipStore {
  matchAllIds: Set<EventId>;
  matchById: Map<EventId, BetslipMatch>;
  totalBets: number;
  totalOdds?: number;
  totalOddsOrig?: number;
  disabled?: boolean;
  totalCols?: number;
  totalOddsMin?: number;
  totalOddsMax?: number;
  totalOddsMinOrig?: number;
  totalOddsMaxOrig?: number;
  change_down?: boolean;
}
type BetslipStore = Omit<InternalBetslipStore, "matchAllIds" | "matchById"> & {
  matchAllIds: MatchAllIds;
  matchById: BetslipMatchById;
};

interface RawBootstrap {
  sp: any;
  sl: any;
  ep: any;
  el: any;
  mf: any;
  cm: any;
  cm100: any;
  ctm: any;
  ctm100: any;
  cels: any;
  celc: any;
  celg: any;
  celt: any;
}
type SportEventListData = Pick<RawBootstrap, "ep" | "el">;
interface IRawBootstrapManager {
  fetchRawBootstrap(sportId: SportId): Promise<RawBootstrap>;
}
interface ISportListManagerForSport {
  getSports(live?: number): Sport[];
  getSportsDestructured(live?: number): DestructuredSports;
  getSportsFetchKeys(shard?: string): string[];
}
interface ISportEventListManager {
  getEventCollection(sportId: SportId, live?: number): EventCollection;
  calculateGlobalConfig(sportId: SportId, categId: CategId, groupId: number, tourId: TourId, type: number): any;
  getEvents(sportId: SportId, live: number);
  getEvent(id: EventId);
  getCategs(sportId: SportId, live: number);
  getCategAllIds(sportId: number, live: number);
  getTours(categId: number, live: number);
  getTourAllIds(categId: number, isLive: boolean);
  getAllTours(sportId: number, live: number);
  getEventHierarchy(eventId: string);
  getEventMaps(eventId: string);
  getAvailableDates(): DateAllIds;
}
interface ISportMarketManager {
  getMarkets(sportId: SportId): MarketById;
  getMarket(sportId: SportId, marketId: MarketId): Market | undefined;
  getMarketsTr(sportId: number);
  getMarketFilterList(mf: string);
}
interface ISport extends ISportMarketManager {
  EventListManager: ISportEventListManager;
  initApp(): void;

  getRawBootstrap(): RawBootstrap;
  getBootstrap(live?: number): Bootstrap;

  /* Sport List Methods */
  getSportList(live?: Live): SportList;
  getSportListDestructured(live?: Live): DestructuredSports;

  /* Event List Methods */
  getEventCollection(sportId: SportId, live: number): EventCollection;
  // calculateGlobalConfig(sportId: SportId, categId: CategId, groupId: number, tourId: TourId, type: number): any;
  getEvents(sportId: SportId, live: number);
  getEvent(id: EventId);
  getCategs(sportId: SportId, live: number);
  getCategAllIds(sportId: number, live: number);
  getTours(categId: number, live: number);
  getTourAllIds(categId: number, isLive: boolean);
  getAllTours(sportId: number, live: number);
  getEventHierarchy(eventId: string);
  getEventMaps(eventId: string);
  getAvailableDates(): DateAllIds;
}
interface IInterface {
  // SportInstance: ISport | null;

  /* General Methods */
  initializeData(sportId?: SportId): Promise<void>;
  setSportId(newSportId: SportId): Promise<void>;

  getRawBootstrap(): RawBootstrap;
  getBootstrap(live?: number): Bootstrap;

  /* Sport List Methods */
  getSportList(live?: Live): SportList;
  getSportListDestructured(live?: Live): DestructuredSports;

  /* Event List Methods */
  getEventCollection(sportId: SportId, live: number): EventCollection;
  getEvents(sportId: SportId, live: number);
  getEvent(id: EventId);
  getCategs(sportId: SportId, live: number);
  getCategAllIds(sportId: number, live: number);
  getTours(categId: number, live: number);
  getTourAllIds(categId: number, isLive: boolean);
  getAllTours(sportId: number, live: number);
  getEventHierarchy(eventId: string);
  getEventMaps(eventId: string);
  getAvailableDates(): DateAllIds;

  /* Market List Methods */
}

interface DestructuredSports {
  sportAllIds: SportAllIds;
  sportById: SportById;
}
