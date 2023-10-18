import clsx from "clsx";
import Article from "@/components/elements/Article";
import Asset from "@/components/elements/Asset";
import RenderHTML from "@/components/elements/RenderHTML";
import CTA from "@/components/elements/CTA";
import { SectionType } from "@/models/page";
import Section from "@/components/elements/Section";
import { findImage } from "@/utils/filter";
import Headline from "@/components/elements/Headline";

function About({ headline, body, anchor, callToAction, images }: SectionType) {

  const bgImage = findImage(images, 'bg');
  const image = findImage(images, '!bg');

  return <>
    <div className="absolute inset-0 z-0">
      <Asset asset={bgImage} alt={''} className="[&>img]:h-full [&>img]:w-full" />
    </div>
    <Article className="text-center pt-[74px]" anchor={anchor?.tag}>
      <div className="relative z-10">
        <Asset asset={image} quality={100} alt={headline} className="[&>img]:m-auto md:[&>img]:p-0 [&>img]:px-10 brightness-75" />
        <Section animate="b-t">
          <Headline headline={headline} as='h1' className="text-4xl md:text-9xl mt-14">
            <RenderHTML body={body} className="text-sm md:text-lg mt-7 max-w-screen-lg m-auto" />
          </Headline>
          <CTA cta={callToAction} className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">
            <span className="inline-block">{callToAction?.title}</span>
            <svg className="animate-bounce inline-block fill-pnk-100 group-hover:animate-none" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512" xmlSpace="preserve">
              <g>
                <g>
                  <g>
                    <path d="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333
				c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333
				z"/>
                    <path d="M347.582,198.248L256,289.83l-91.582-91.582c-8.331-8.331-21.839-8.331-30.17,0c-8.331,8.331-8.331,21.839,0,30.17
				l106.667,106.667c8.331,8.331,21.839,8.331,30.17,0l106.667-106.667c8.331-8.331,8.331-21.839,0-30.17
				C369.42,189.917,355.913,189.917,347.582,198.248z"/>
                  </g>
                </g>
              </g>
            </svg>
          </CTA>
        </Section>
      </div>
    </Article>
  </>

}

export default About;