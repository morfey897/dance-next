"use client";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

function Section({ className, children, animate, ...rest }: { animate?: 'b-t' | 'l-r' | 'r-l' } & React.HTMLProps<HTMLElement>) {

  const { ref, inView } = useInView({
    threshold: 0.1,
    delay: 100,
    triggerOnce: true,
    initialInView: true,
  });

  return (
    <section ref={ref} className={clsx('relative', !!animate && 'transition-transform ease-in duration-500',
      {
        'translate-y-36': animate === 'b-t',
        'translate-x-48': animate === 'r-l',
        '-translate-x-48': animate === 'l-r',
      }, inView && '!translate-y-0 !translate-x-0', className)} {...rest}>
      {children}
    </section>
  );
}

export default Section;