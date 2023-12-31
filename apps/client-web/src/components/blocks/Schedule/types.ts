
export type EventType = {
  uid: string;
  time: string;
  duration: number;
  direction: string;
  trainer: string;
  gym: string;
  date: string;
  info?: string;
}

export type EventsType = Array<{
  date: Date;
  list: EventType[];
}>;

export type DateType = {
  time: string;
  items: Array<EventType | EventType[] | undefined>;
}

export type GridState = {
  now: Date;
  active: Date;
  locale: Locale; //todo
  dates: Array<Date>;
}

export type DateAction = {
  type: 'inc' | 'dec' | 'active' | 'now';
  payload?: Date;
}
