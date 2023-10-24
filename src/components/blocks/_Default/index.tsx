import Article from "@/components/elements/Article";
import Asset from "@/components/elements/Asset";
import RenderHTML from "@/components/elements/RenderHTML";
import CTA from "@/components/elements/CTA";
import { SectionType } from "@/models/page";
import Headline from "@/components/elements/Headline";
import { ChevronDown } from "@/components/elements/Icons";

function DefaultBlock({ headline, body, anchor, callToAction, images }: SectionType) {

  return <Article
    anchor={anchor?.tag}
    className="text-center pt-[74px] pb-[124px] md:pt-[274px] md:pb-[270px]"
    effect={{ x: "left" }}
  >
    {images?.map((bgImage) => <Asset key={bgImage._id} asset={bgImage} alt={bgImage.alt || bgImage.caption} className="[&>img]:h-full [&>img]:w-full" />)}
    <div className="text-center">
      <Headline headline={headline} className="text-4xl md:text-6xl uppercase text-center">
        <RenderHTML body={body} className='text-sm md:text-lg mt-7 max-w-screen-lg m-auto' />
      </Headline>
      <CTA cta={callToAction} className="group space-x-2 block w-fit m-auto mt-7 text-sm md:text-lg text-center border-2 border-pnk-200 rounded-3xl py-2 px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 active:border-pnk-100 active:shadow active:shadow-pnk-100">
        <span className="inline-block">{callToAction?.title}</span>
        <ChevronDown />
      </CTA>
    </div>
  </Article>;
}

export default DefaultBlock;