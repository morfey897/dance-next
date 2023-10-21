import clsx from "clsx";
import type { PriceType } from "@/models/price";
import RenderHTML from "../../elements/RenderHTML";
import CurrencyLabel from "./CurrencyLabel";
import Heading from "@/components/elements/Headline/Heading";

const Label = ({ className, children, ...rest }: React.HTMLProps<HTMLParagraphElement>) => <p className={clsx("absolute top-[-24px] right-0 text-pnk-100 uppercase rounded-full border w-14 h-14 font-light text-sm flex justify-center items-center leading-tight rotate-45", className)} {...rest}>{children}</p>

export function Item({ item, className }: { item: PriceType } & React.HTMLProps<HTMLDivElement>) {

  const hasOldPrice = item.oldPrice > 0 && item.oldPrice != item.price;
  return <BaseItem className={className}>
    {item.labels?.map((item) => <Label key={item.description || item.tag}>{item.description || item.tag}</Label>)}
    <Heading as="h4" className="font-medium text-xl md:text-4xl">{item.headline}</Heading>
    <div className="relative text-center mt-5">
      <h4 className="font-medium md:font-light text-xl md:text-4xl text-pnk-200">{item.price}<span className="ml-2"><CurrencyLabel currency={item.currency} /></span></h4>
      {hasOldPrice &&
        <span className="absolute top-[-20px] right-[20%] opacity-40 before:block before:border before:absolute before:w-[115%] before:left-[-5%] before:top-[40%]">
          {item.oldPrice}
          <span className="ml-1"><CurrencyLabel currency={item.currency} /></span>
        </span>
      }
    </div>
    {!!item.body && <RenderHTML className="font-light text-sm md:text-lg mt-5" body={item.body} />}
  </BaseItem>;
}

export function GroupItem({ item, className }: { item: PriceType & { items?: PriceType[] } } & React.HTMLProps<HTMLDivElement>) {

  return <BaseItem className={className}>
    <Heading as="h4" className="font-medium text-xl md:text-4xl">{item.headline}</Heading>
    <RenderHTML className="font-light text-sm md:text-lg mt-5" body={item.body} />
    <div className="divide-y divide-pnk-100 mt-7 md:mt-8">
      {item.items?.map((itm) => {
        const hasOldPrice = itm.oldPrice > 0 && itm.oldPrice != itm.price;
        return (
          <div className={clsx("flex justify-between text-sm md:text-lg font-light py-2", hasOldPrice && 'pt-5')} key={itm._id}>
            <div className="text-left">
              <p>{itm.headline}</p>
              <RenderHTML className="font-light leading-3 text-[0.65rem] text-neutral-400" body={itm.body} />
            </div>
            <div className="flex gap-x-2">
              <p className={clsx(hasOldPrice && 'text-pnk-200')}>{itm.price}<span className="ml-1"><CurrencyLabel currency={itm.currency} short /></span></p>
              {hasOldPrice && <span className="text-xs md:text-base relative top-[-20px] right-0 opacity-40 before:block before:border before:absolute before:w-[115%] before:left-[-5%] before:top-[40%]">
                {itm.oldPrice}
                <span className="ml-0.5"><CurrencyLabel currency={itm.currency} short /></span>
              </span>}
            </div>
          </div>
        )
      })}
    </div>
  </BaseItem>;
}

function BaseItem({ className, children }: React.HTMLProps<HTMLDivElement>) {
  return <div className={clsx("bg-[#161616] rounded-lg py-7 px-3 text-center w-full md:w-[345px] lg:w-[395px] relative", className)}>
    {children}
  </div>
}
