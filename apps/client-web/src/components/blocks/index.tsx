import React from "react";

import { SectionType } from "@/models/page";
import { SettingsType } from "@/models/settings";

import About from "./About";
import Directions from "./Directions";
import Gallery from "./Gallery";
import Contacts from "./Contacts";
import Prices from "./Prices";
import Schedule from "./Schedule";
import Default from "./_Default";

enum SectionEnum {
  ABOUT = 'about',
  DIRECTIONS = 'directions',
  GALLARY = 'gallery',
  CONTACTS = 'contacts',
  PRICES = 'prices',
  SCHEDULE = 'schedule',
  __undefined__ = "__undefined__",
};

const MAP: Record<string, React.FC<SectionType & { settings?: SettingsType }>> = {
  [SectionEnum.ABOUT]: About,
  [SectionEnum.DIRECTIONS]: Directions,
  [SectionEnum.GALLARY]: Gallery,
  [SectionEnum.CONTACTS]: Contacts,
  [SectionEnum.PRICES]: Prices,
  [SectionEnum.SCHEDULE]: Schedule,
  [SectionEnum.__undefined__]: Default,
};

function Factory({ sections, settings }: { sections: SectionType[]; settings?: SettingsType; }) {

  return sections.map((section, index) => {
    const key = section?.wrapper?.code;
    const Component = MAP[key || "__undefined__"] || Default;
    return <Component key={key || `undefined-${index}`} {...section} settings={settings} />
  });
}

export default Factory;