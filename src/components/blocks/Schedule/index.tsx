import Headline from "@/components/elements/Headline";
import Article from "@/components/elements/Article";
import Section from "@/components/elements/Section";
import RenderHTML from "@/components/elements/RenderHTML";
import ClientWrapper from "./ClientWrapper";
import type { SectionType } from "@/models/page";
import type { SettingsType } from "@/models/settings";

function Schedule({ headline, anchor, body, settings }: SectionType & { settings?: SettingsType }) {

  return <Article anchor={anchor?.tag}>
    <Section animate="b-t">
      <Headline headline={headline} className="uppercase text-3xl md:text-7xl text-center">
        <RenderHTML body={body} />
      </Headline>
    </Section>
    <Section animate="b-t">
      <ClientWrapper settings={settings} />
    </Section>
  </Article >;
}

export default Schedule;