import React from "react";

import { SectionType } from "@/models/page";

import About from "./About";
import Directions from "./Directions";
import Gallery from "./Gallery";

const MAP: Record<string, React.FC<SectionType>> = {
  "about": About,
  "directions": Directions,
  'gallery': Gallery,
}

function NoneComponent() {
  return null;
}

function Factory({ sections }: { sections: SectionType[] }) {

  return sections.map(section => {
    const Component = MAP[section?.wrapper?.code] || NoneComponent;
    return <Component {...section} />
  });
}

export default Factory;