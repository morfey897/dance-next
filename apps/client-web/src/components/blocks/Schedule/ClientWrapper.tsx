'use client';

import { useReducer } from "react";
import { addDays, previousMonday, differenceInDays } from "date-fns";
import { enUS, ru, uk } from 'date-fns/locale'
import GridHeader from "./GridHeader";
import ChangeDate from "./ChangeDate";
import Grid from "./Grid";
import type { GridState, DateAction, EventType } from "./types";
import useSWR from 'swr';
import { toDate } from "@/utils/date";

import { useInView } from 'react-intersection-observer';
import { useLocale } from "@/components/hooks/useLocale";
import { SettingsType } from "@/models/settings";

const LOCALES: Record<string, Locale> = {
  uk: uk,
  ru: ru,
  en: enUS,
};

const DAYS = new Array(7).fill(0).map((_, index) => index);

const generateDates = (array: Array<number>, active: Date) => array.map((index) => addDays(active, index));

function init({ lang }: { lang: string }) {
  const now = new Date(toDate(new Date()));
  const active = previousMonday(now);
  return {
    now,
    active: now,
    locale: LOCALES[lang] || uk,
    dates: generateDates(DAYS.map((index) => index), active),
  }
}

function reducer(state: GridState, action: DateAction): GridState {
  switch (action.type) {
    case 'now': {
      const now = new Date(toDate(new Date()));
      const active = previousMonday(now);
      return {
        ...state,
        active: now,
        dates: generateDates(DAYS.map((index) => index), active),
      };
    }
    case 'inc': {
      const active = addDays(state.dates[0], 7);
      return {
        ...state,
        active,
        dates: generateDates(DAYS, active),
      }
    }
    case 'dec': {
      const active = addDays(state.dates[0], -7);
      return {
        ...state,
        active,
        dates: generateDates(DAYS, active),
      }
    }
    case 'active': {
      return {
        ...state,
        active: action.payload || new Date(),
      }
    }
    default:
      throw new Error();
  }
}

const fetcher = (url: string) => fetch(url)
  .then(r => r.json())
  .then(({ success, events, start, end, error }: { events: Array<EventType>; start: string; end: string; success: boolean; error?: string; }) => {
    if (!success) throw new Error(error);
    const startDate = new Date(start);
    let list = new Array(differenceInDays(new Date(end), startDate) + 1).fill(0).map((_, index) => {
      let d = addDays(startDate, index);
      return {
        date: d,
        list: events.filter(event => event.date === toDate(d))
      }
    });
    return list
  });

function InnerGrid() {

  const locale = useLocale();

  const [state, dispatch] = useReducer(reducer, { lang: locale }, init);
  const { data: events, error, isLoading } = useSWR(`/api/events?start=${toDate(state.dates[0])}&end=${toDate(state.dates[state.dates.length - 1])}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <>
    <ChangeDate
      className="mt-12"
      state={state}
      onNext={() => dispatch({ type: 'inc' })}
      onPrev={() => dispatch({ type: 'dec' })}
      onNow={() => dispatch({ type: 'now' })} />
    <GridHeader onSelectDate={(d) => dispatch({ type: 'active', payload: d })} state={state} />
    <Grid state={state} events={events} loading={isLoading} />
  </>
}

function ClientWrapper({ settings }: { settings?: SettingsType }) {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return <div ref={ref}>
    {inView && <InnerGrid />}
  </div>;
}

export default ClientWrapper;