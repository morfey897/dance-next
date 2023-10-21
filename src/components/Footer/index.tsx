import SocialMedia from "@/components/blocks/Contacts/SocialMedia";
import { CTAType } from "@/models/_default";
import { SettingsType } from "@/models/settings";
import CTA from "../elements/CTA";
import clsx from "clsx";

function Footer({ settings, navigation }: { navigation: Array<CTAType> | undefined; settings: SettingsType | undefined; }) {

  const { address, socials } = settings || {};

  return <footer className={"w-full z-20 pt-6 pb-6"}>
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex justify-between items-center gap-4 flex-col-reverse md:flex-row">
        <p className="text-[10px]">© {new Date().getFullYear()} {address?.place || process.env.NEXT_PUBLIC_TITLE}</p>
        {!!navigation && <ul className="gap-4 flex flex-wrap">
          {
            navigation?.map((cta, index) => (<li key={`link-${index}`}><CTA className={clsx('text-sm  hover:underline hover:decoration-pnk-100')} cta={cta} /></li>))
          }
        </ul>}
        <ul className="gap-4 flex flex-wrap">
          {
            socials?.map((social, index) => <li key={`social-${index}`} ><SocialMedia {...social} title={''} /></li>)
          }
        </ul>
      </div>
      <div className="flex justify-center md:justify-end mt-4">
        <p className="flex items-baseline gap-x-1 border-t pt-2 font-light text-xs">Made in <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" height={16}>
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="gold" d="M0 0h640v480H0z" />
            <path fill="#0057b8" d="M0 0h640v240H0z" />
          </g>
        </svg></p>
      </div>
    </div>
  </footer>
}

export default Footer;
