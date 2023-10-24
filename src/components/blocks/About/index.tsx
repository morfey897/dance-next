import clsx from "clsx";
import Article from "@/components/elements/Article";
import Asset from "@/components/elements/Asset";
import RenderHTML from "@/components/elements/RenderHTML";
import CTA from "@/components/elements/CTA";
import { SectionType } from "@/models/page";
import Section from "@/components/elements/Section";
import { findImage } from "@/utils/filter";
import Headline from "@/components/elements/Headline";
import { ChevronDown } from "@/components/elements/Icons";

function About({ headline, body, anchor, callToAction, images }: SectionType) {

  const bgImage = findImage(images, 'bg');
  const image = findImage(images, '!bg');

  return <>
    <div className="absolute inset-0 z-0 hidden lg:block">
      <Asset asset={bgImage} alt={''} className="[&>img]:h-full [&>img]:w-full" />
    </div>
    <Article className="text-center pt-[74px]" anchor={anchor?.tag} effect={{ x: 'center', y: 'center' }}>
      <div className="relative z-10">
        <Asset asset={image} quality={100} alt={headline} className="[&>img]:m-auto md:[&>img]:p-0 [&>img]:px-10 brightness-75" />
        <Section animate="b-t">
          <Headline headline={headline} as='h1' className="text-4xl md:text-9xl mt-14 uppercase text-center">
            <RenderHTML body={body} className="text-sm md:text-lg mt-7 max-w-screen-lg m-auto" />
          </Headline>
          <CTA cta={callToAction} className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">
            <span className="inline-block">{callToAction?.title}</span>
            <ChevronDown />
          </CTA>
        </Section>
      </div>
    </Article>
  </>

}

export default About;