import clsx from "clsx";
import type { BGPosition } from "./BgEffect";
import BGEffect from "./BgEffect";
import Anchor from "./Anchor";

function Article({ effect, className, anchor, children, ...rest }: { effect?: BGPosition; anchor?: string; } & React.HTMLProps<HTMLElement>) {

  return <article className={clsx("w-full z-20 pt-4 pb-16", !!effect && 'overflow-hidden', className)} {...rest}>
    {anchor && <Anchor id={anchor} />}
    <div className="max-w-screen-xl mx-auto px-4">
      {!!effect && <BGEffect {...effect} />}
      {children}
    </div>
  </article>
}

export default Article;