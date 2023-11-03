import Heading from "@/components/elements/Headline/Heading";

function Group({ headline, children }: { headline: string } & React.HTMLProps<HTMLDivElement>) {
  return <div className="space-y-10 md:space-y-14">
    {!!headline && <Heading as="h3" className="uppercase text-xl md:text-3xl text-center md:text-left">{headline}</Heading>}
    <div className="flex gap-x-7 gap-y-10 flex-wrap justify-center xl:justify-start">
      {children}
    </div>
  </div>;
}

export default Group;