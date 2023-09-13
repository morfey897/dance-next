import React from "react";

import { SectionType } from "@/models/page";
import { SettingsType } from "@/models/settings";

import About from "./About";
import Directions from "./Directions";
import Gallery from "./Gallery";
import Contacts from "./Contacts";

const MAP: Record<string, React.FC<SectionType & { settings: SettingsType }>> = {
  "about": About,
  "directions": Directions,
  'gallery': Gallery,
  'contacts': Contacts,
}

function NoneComponent() {
  return null;
}

function Factory({ sections, settings }: { sections: SectionType[]; settings: SettingsType; }) {

  return sections.map(section => {
    const Component = MAP[section?.wrapper?.code] || NoneComponent;
    return <Component {...section} settings={settings} />
  });
}

export default Factory;