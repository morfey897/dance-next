import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types';
import Asset from './Asset';
import clsx from 'clsx';

function RenderHTML({ body, className, ...rest }: { body?: PortableTextBlock } & React.HTMLProps<HTMLDivElement>) {
  return body ? <div className={clsx('block-content', className)} {...rest}>
    <PortableText
      value={body}
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