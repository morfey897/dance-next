'use client';

import clsx from "clsx";
import DirectionItem from "./Item";
import Asset from "@/components/elements/Asset";

import { DirectionType } from "@/models/direction";
import { useEffect, useState } from "react";
import Section from "@/components/elements/Section";
import { buildAsset } from "@/lib/sanity";

function ClientWrapper({ directions }: { directions: Array<DirectionType>; }) {

  const [active, setActive] = useState({ cur: '', prev: '' });

  useEffect(() => {
    if (directions && directions.length) {
      setActive({ cur: directions[0]._id, prev: '' });
    }
  }, [directions]);

  return <div className="flex mt-12 flex-col lg:flex-row">
    <div className="grow w-full">
      <div className="lg:min-h-[500px]">
        <Section animate="l-r">
          {directions?.map((item: DirectionType, index: number) => (
            <DirectionItem key={`direction-${item._id}`} item={item} index={index} activePrev={active.prev} activeCur={active.cur}
              onClick={() => {
                setActive(({ cur }) => ({ prev: cur, cur: item._id }));
              }}
            />
          ))}
        </Section>
      </div>
    </div>
    <div className="relative grow w-full mt-4 lg:mt-0 min-h-[217px] md:min-h-[450px] lg:min-h-auto overflow-hidden">
      <Section animate="r-l">
        {directions?.map((item) => {
          return <Asset key={`image-${item._id}`} className={clsx("!absolute top-0 transition-opacity duration-500 opacity-0 w-full object-contain lg:object-cover h-[230px] md:h-[450px] lg:h-auto", {
            '!opacity-0': active.prev === item._id,
            '!opacity-100': active.cur === item._id,
          })}
            asset={item.images && item.images[0]}
            alt={item.headline}
          />
        })}
      </Section>
    </div>
  </div>;
}

export default ClientWrapper;