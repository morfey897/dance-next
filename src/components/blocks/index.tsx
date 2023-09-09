import React from "react";

import { SectionType } from "@/models/page";

import About from "./About";
import Directions from "./Directions";

const MAP: Record<string, React.FC<SectionType>> = {
  "about": About,
  "directions": Directions,
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