interface HeaderMenuItem {
  name: string;
}

interface Store {
  availableDates: any[];
  availableTimes: string[];
  categById: object;
  marketAllIds: object;
  marketById: object;
  marketGroups: any[];
  matchById: object;
  sportAllIds: any[];
  sportById: object;
  sportSelectedAllIds: any[];
  sportSelectedCategAllIds: object;
  tourById: object;
}

interface StoreLive {
  categById: object;
  marketAllIds: object;
  marketById: object;
  marketGroups: any[];
  matchById: object;
  sportAllIds: any[];
  sportById: object;
  sportSelectedAllIds: any[];
  sportSelectedCategAllIds: object;
  tourById: object;
}
