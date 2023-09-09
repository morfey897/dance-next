import clsx from "clsx";
// import { useEffect, useState } from "react";
import DirectionItem from "./Item";
import Section from "../../elements/Section";
import Headline from "../../elements/Headline";
import Picture from "../../elements/Picture";

import RenderHTML from "../../elements/RenderHTML";

import { SectionType } from "@/models/page";

function Directions({ headline, anchor, divisions, body }: SectionType) {

  const active = { cur: '', prev: '' };

  console.log('divisions', divisions);
  // const [active, setActive] = useState({ cur: '', prev: '' });

  // useEffect(() => {
  //   if (sections && sections.length) {
  //     setActive({ cur: sections[0]._id, prev: '' });
  //   }
  // }, [sections]);

  return <Section effect={{ x: 'left', y: 'center' }} anchor={anchor?.tag}>
    <Headline headline={headline}>
      <RenderHTML value={body} />
    </Headline>
    <div className="flex mt-12 flex-col lg:flex-row">
      <div className="grow w-full">
        <div className="lg:min-h-[500px]">
          {/* {sections?.map((item: SectionType, index: number) => (
            <DirectionItem key={`direction-${item._id}`} item={item} index={index} activePrev={active.prev} activeCur={active.cur} onClick={() => {
              // setActive(({ cur }) => ({ prev: cur, cur: item._id }));
            }} />
          ))} */}
        </div>
      </div>
      <div className="grow w-full mt-4 lg:mt-0 relative min-h-[217px] md:min-h-[450px] lg:min-h-auto overflow-hidden">
        {/* {sections?.map((item) => (
          <Picture key={`image-${item._id}`} className={clsx("absolute transition-opacity duration-500 opacity-0 w-full object-contain lg:object-cover h-[217px] md:h-[450px] lg:h-auto", {
            '!opacity-0': active.prev === item._id,
            '!opacity-100': active.cur === item._id,
          })} image={active.prev === item._id || active.cur === item._id ? (item.images || [])[0] : undefined} alt={item.headline} />
        ))} */}
      </div>
    </div>
  </Section>;
}

export default Directions;