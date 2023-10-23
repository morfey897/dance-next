import { CTAType } from "@/models/_default";
import CTA from "@/components/elements/CTA";

function Navigation({ navigation, mobile }: { mobile?: boolean; navigation: Array<CTAType> | undefined }) {

  return (navigation?.length || 0) > 0 ? <ul className={mobile ?
    "absolute invisible opacity-0 -translate-y-2 transition-all group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 bg-black bg-opacity-60 p-2.5 right-0 top-8 space-y-4 rounded-sm" :
    "space-x-4"
  }>
    {
      navigation?.map((cta, index) => (
        <li key={`link-${index}`} className='inline-block'>
          <CTA cta={cta} className={mobile ?
            'text-sm text-center py-2 px-4' :
            'text-base lg:text-lg text-center border-2 rounded-3xl py-2 px-2 lg:px-4 hover:bg-pnk-200 hover:border-pnk-200 hover:shadow hover:shadow-pnk-200 border-transparent'} />
        </li>
      ))
    }
  </ul> : null;
}

export default Navigation;