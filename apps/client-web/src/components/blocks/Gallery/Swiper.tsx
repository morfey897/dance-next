'use client';

import { useRef, useMemo, useState, useCallback, useEffect, FC } from "react";
import { throttle } from "lodash";
import clsx from "clsx";
import SwiperItem from "./SwiperItem";
import type { ControlsType } from "./Controls";
import { useInView } from 'react-intersection-observer';

const SCROLL_EPS = 0.1;

const smoothScroll = (index: number, root: HTMLElement | null, behavior: 'auto' | 'smooth' = 'smooth'): Promise<void> => new Promise((resolve: Function) => {
  if (!root) return resolve();
  const items = [...root.children].filter(children => children.getAttribute('data-item') === 'true');
  if (index < 0 || index >= items.length) return resolve();
  const element = items[index];
  if (!element) return resolve(false);
  const rootRect = root.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const rootCenter = rootRect.x + rootRect.width / 2;
  const elementCenter = elementRect.x + elementRect.width / 2;
  root.scrollTo({ left: root.scrollLeft - (rootCenter - elementCenter), behavior });
});

const calculateScale = (root: HTMLElement | null): Array<number> => {
  if (!root) return [];
  const rect: DOMRect = root.getBoundingClientRect();
  const center = rect.x + rect.width / 2;
  const totalSize = rect.width;
  const items = [...root.children].filter(children => children.getAttribute('data-item') === 'true');;
  if (items.length <= 0) return [];

  return items.map((children) => {
    let rect = children.getBoundingClientRect();
    const rowScale = Math.round(((1 - Math.abs(rect.x + rect.width / 2 - center) / totalSize) + SCROLL_EPS) * 100) / 100;
    const scale = rowScale > 1 ? 1 : (rowScale <= SCROLL_EPS ? SCROLL_EPS : rowScale);
    return scale;
  });
};

function Swiper<T>({ items, Controls, Item, autoScroll, startAt, className, ...props }: { items?: Array<{ _id: string } & T>; Controls?: FC<ControlsType>; Item?: FC<{ asset: T }>; autoScroll?: number; startAt?: number } & React.HTMLProps<HTMLDivElement>) {

  const ref = useRef<HTMLUListElement>(null);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
  });

  const [scales, setScales] = useState<Array<number>>([]);

  const pages = useMemo(() => new Array(items ? items.length : 0).fill(1).map((_, index) => index), [items]);

  const activePage = useMemo(() => {
    const max = { index: -1, scale: 0 };
    scales.forEach((scale, index) => {
      if (scale > max.scale) {
        max.scale = scale;
        max.index = index;
      }
    });
    return max.index;
  }, [scales]);

  const onScroll = useMemo(() => throttle(() => {
    setScales(calculateScale(ref.current));
  }, 150), []);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  const onResize = useMemo(() => throttle(() => {
    smoothScroll(startAt ?? 0, ref.current, 'auto');
    setScales(calculateScale(ref.current));
  }, 300), []);// eslint-disable-line react-hooks/exhaustive-deps

  const onSelectPage = useCallback((page: number) => {
    smoothScroll(page, ref.current);
  }, []);

  useEffect(() => {
    onResize();
  }, [items, onResize]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      onScroll.cancel();
      onResize.cancel();
      window.removeEventListener('resize', onResize);
    }
  }, [onScroll, onResize]);

  useEffect(() => {
    const changeUID = setInterval(() => {
      if (inView) {
        if (activePage + 1 >= pages.length) {
          onSelectPage(0);
        } else {
          onSelectPage(activePage + 1);
        }
      }
    }, (autoScroll || 0) * 1000);
    return () => {
      clearInterval(changeUID);
    }
  }, [inView, activePage, pages, autoScroll, onSelectPage]);

  return <div className={clsx("relative", className)} {...props} ref={(autoScroll || 0) > 0 ? inViewRef : undefined}>
    <ul
      onScroll={onScroll}
      ref={ref}
      className={clsx("mt-12 snap-x snap-mandatory flex hide-scroll overflow-x-auto opacity-0",
        "xl:gap-x-[48px]",
        "lg:gap-x-[31px]",
        "md:gap-x-[8px]",
        "gap-x-4",
        !!items && "transition-opacity opacity-100"
      )}>
      <SwiperItem />
      {
        !!Item && items?.map((image, index) => (
          <SwiperItem key={image._id} scale={scales[index] || 1} >
            <Item asset={image} />
          </SwiperItem>
        ))
      }
      <SwiperItem />
    </ul>
    {
      !!Controls && <Controls onSelectPage={onSelectPage} pages={pages} active={activePage} />
    }
  </div>
}

export default Swiper;