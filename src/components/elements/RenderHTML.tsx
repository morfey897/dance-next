import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types';

function RenderHTML({ value }: { value?: PortableTextBlock }) {
  return value ? <PortableText
    value={value}
  /> : null;
}

export default RenderHTML;