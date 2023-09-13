import Section from "@/components/elements/Section";
import Article from "@/components/elements/Article";
import Phone from "./Phone";
import SocialMedia from "./SocialMedia";
import clsx from "clsx";
import Asset from "@/components/elements/Asset";
import RenderHTML from "@/components/elements/RenderHTML";
import { SectionType } from "@/models/page";
import MapSection from "./MapSection";
import { SettingsType } from "@/models/settings";

// address, phones, socials, 
function Contacts({ headline, images, anchor, body, settings }: { settings: SettingsType } & SectionType) {

  const { phones, socials, address } = settings || {};

  const addressMap = [address?.city, address?.district, address?.street].filter(a => !!a).join(", ");

  return <Article anchor={anchor?.tag}>
    <div className="flex gap-8 flex-col-reverse lg:flex-row ">
      <div className="basis-2/5 w-full">
        <MapSection geo={{ lat: 50.459689, lng: 30.634076 }} />
      </div>
      <div className="basis-3/5 w-full flex flex-col justify-between">
        <Section animate="r-l">
          <div>
            <h2 className="uppercase text-3xl md:text-7xl text-left">{headline}</h2>
            <a aria-label={addressMap} className="block text-base md:text-3xl mt-10 max-w-screen-md m-auto text-left underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(`${address?.place}`)}`} target="_blank" rel="noreferrer">{addressMap}</a>
            <div className="text-xs md:text-base mt-5 max-w-screen-md m-auto text-left">
              <RenderHTML value={body} />
            </div>
          </div>
          <div className="flex flex-col-reverse lg:flex-col">
            {(images?.length || 0) > 0 && <div className="flex gap-2 mt-5 flex-wrap">
              {images?.map((image, index) => <div key={index} className={clsx('relative w-full md:w-[240px] h-[240px] md:h-auto')}>
                <Asset key={index} asset={image} className="w-[inherit] h-[inherit] [&>img]:object-cover [&>img]:w-[inherit] [&>img]:h-[inherit]" />
                {(typeof image === "object" && !!image.caption || !!image.alt) && <div className="text-sm absolute bottom-0 left-0 right-0 bg-[#161616]">
                  <p className="px-1 py-1">{image.caption || image.alt}</p>
                </div>}
              </div>
              )}
            </div>}
            <div className="flex justify-between mt-10 items-end gap-8 flex-row">
              <ul className="space-y-6 md:space-y-10">{phones?.map((phone) => <li key={phone.code + phone.number} ><Phone {...phone} /></li>)}</ul>
              <ul className="space-y-6 md:space-y-10">{socials?.map((social) => <li key={social.link} ><SocialMedia {...social} /></li>)}</ul>
            </div>
          </div>
        </Section>
      </div>
    </div>
  </Article>
}

export default Contacts;