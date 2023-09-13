import { PhoneType } from "@/models/settings";
import { formatPhone } from "@/utils/str";
import { memo } from "react";

function Phone({ code, number, ...props }: PhoneType & React.HTMLProps<HTMLAnchorElement>) {
  return <a aria-label="Phone" className="flex underline font-medium text-sm md:text-3xl justify-center lg:justify-start" href={`tel:${code + number}`} {...props}>{formatPhone({ code, number })}</a>;
}

export default memo(Phone);