import { PhoneType } from "@/models/settings";
import { formatPhone } from "@/utils/str";
import { memo } from "react";
import Link from "next/link";

function Phone({ code, number, ...props }: PhoneType & Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>) {
  const phone = formatPhone({ code, number });
  return (
    <Link
      aria-label={phone}
      className="flex underline font-medium text-sm md:text-3xl justify-center lg:justify-start"
      href={`tel:${code + number}`}
      {...props}>
      {phone}
    </Link>
  );
}

export default memo(Phone);