import { calendar } from "@googleapis/calendar";
import { JWT } from 'google-auth-library';
import { rrulestr } from "rrule";

type JSON_FILE = {
  client_email: string;
  private_key: string;
  private_key_id: string;
  token_uri: string
};

type EventType = {
  uid: string;
  date: string;
  time: string;
  duration: number;
  trainer: string;
  direction: string;
  gym: string;
  info?: string;
  timestamp?: number;
}

type GoogleEventType = {
  id: string;
  summary: string;
  description: string;
  location: string;
  recurrence: Array<string>;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

export async function events({ start: st, end: ed }: { start: string | Date; end: string | Date }): Promise<Array<EventType> | null> {

  try {

    const start = (typeof st === 'string' ? st : st.toISOString()).split("T")[0];
    const end = (typeof ed === 'string' ? ed : ed.toISOString()).split("T")[0];

    if (!start || !end || !process.env.NEXT_PRIVATE_GOOGLE_SERVICE_ADDRESS) throw new Error('Undefined env');
    const startDateTime = `${start}T00:00:01Z`;
    const endDateTime = `${end}T23:59:59Z`;

    const key: {
      client_email: string;
      private_key: string;
      private_key_id: string;
      token_uri: string
    } = JSON.parse(process.env.NEXT_PRIVATE_GOOGLE_SERVICE_ADDRESS);

    const instance = calendar({
      version: 'v3', auth: new JWT({
        email: key.client_email,
        key: key.private_key,
        scopes: SCOPES,
      })
    });

    const response = await instance.events.list({
      calendarId: process.env.NEXT_PRIVATE_GOOGLE_CALENDAR_ID,
      timeMin: startDateTime,
      timeMax: endDateTime,
    });

    const events = response.data.items?.reduce((list: EventType[], event, index) => {
      const { id, summary, description, location, start: startEvent, end: endEvent, recurrence } = event;
      const [direction, trainer] = summary?.split("|").map(a => a.trim()) || [];
      const [startDateOnly, startTiemOnly] = startEvent?.dateTime?.split('T') || [];
      const matchdata = startTiemOnly.match(/\d{1,2}:\d{1,2}/);
      const time = matchdata && matchdata[0] || "01:00";
      const rule = recurrence && recurrence[0] || "";
      const duration = Math.ceil((new Date(endEvent?.dateTime || "").getTime() - new Date(startEvent?.dateTime || "").getTime()) / (1000 * 60));
      const item = {
        uid: id || `${index}`,
        direction: direction || "",
        trainer: trainer || "",
        info: description || "",
        gym: location || "",
        time,
        duration,
      };

      let listEvents: Array<EventType> = [];
      if (!rule) {
        listEvents.push({ ...item, date: startDateOnly || "", timestamp: new Date(startEvent?.dateTime || "").getTime() });
      } else {
        const rrulePatern = `DTSTART:${startDateOnly.replace(/[^\d]/g, "")}T${time.replace(/[^\d]/g, "")}00Z\n${rule}`;
        try {
          const newListEvents = rrulestr(rrulePatern)
            .between(new Date(start), new Date(end))
            .map(date => ({
              ...item,
              date: date.toISOString().split("T")[0],
              timestamp: date.getTime(),
            }));

            listEvents = newListEvents;
        } catch (error) {
          console.log(error, rrulePatern);
        }
      }

      return list.concat(listEvents);
    }, []);
    return events?.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0)) || [];
  } catch (error: unknown) {
    console.warn((error as Error)?.stack);
    return null;
  }
};
