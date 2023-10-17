import { PhoneType } from "@/models/settings";
import { formatPhone } from "@/utils/str";
import { memo } from "react";

function Phone({ code, number, ...props }: PhoneType & React.HTMLProps<HTMLAnchorElement>) {
  const phone = formatPhone({ code, number });
  return <a aria-label={phone} className="flex underline font-medium text-sm md:text-3xl justify-center lg:justify-start" href={`tel:${code + number}`} {...props}>{phone}</a>;
}

export default memo(Phone);