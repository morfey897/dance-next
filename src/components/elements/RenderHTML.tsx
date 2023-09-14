import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types';
import Asset from './Asset';

function RenderHTML({ value }: { value?: PortableTextBlock }) {
  return value ? <div className='block-content'>
    <PortableText
      value={value}
      components={{
        types: {
          image: ({ value }) => <Asset asset={{
            _id: '',
            caption: '',
            alt: '',
            image: value,
          }} inline />
        },
        marks: {
          strong: ({ children }) => (<strong>
            {children}
          </strong>),
          em: ({ children }) => (<em>
            {children}
          </em>),
          link: ({ children, value }) => (
            <a href={value.href} {...(!value.href.startsWith('/') ? { rel: 'noreferrer noopener', target: "_blank" } : {})} className='underline text-pink-400 hover:text-slate-300'>
              {children}
            </a>
          ),
        }
      }}
    />
  </div> : null;
}

export default RenderHTML;