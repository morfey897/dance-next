"use client";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { useMedia } from "react-use";

const MOBILE_WIDTH = 640;

function Section({ className, children, render, animate, ...rest }: { animate?: 'b-t' | 'l-r' | 'r-l' } & { render?: ((inView: boolean) => JSX.Element) } & React.HTMLProps<HTMLElement>) {

  const isWide = useMedia(`(min-width: ${MOBILE_WIDTH}px)`, false);

  const { ref, inView } = useInView({
    threshold: isWide ? 0.1 : 0,
    delay: 100,
    triggerOnce: true,
    initialInView: true,
  });

  return (
    <section ref={ref} className={clsx('relative', !!animate && 'transition-all ease-in duration-500',
      {
        'opacity-30': !!animate,
        'translate-y-36': animate === 'b-t',
        'translate-x-48': animate === 'r-l',
        '-translate-x-48': animate === 'l-r',
      }, inView && '!translate-y-0 !translate-x-0 !opacity-100', className)} {...rest}>
      {children}
      {typeof render === 'function' && render(inView)}
    </section>
  );
}

export default Section;