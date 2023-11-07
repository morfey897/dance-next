import clsx from "clsx";
import { ReactNode } from "react";

function DropDown({ Element, direction, children, className, size }: { Element: ReactNode; direction: { y: 'top' | 'bottom', x: 'left' | 'right' }; size?: 'sm' | 'md' | 'lg' } & React.HTMLAttributes<HTMLDivElement>) {

  return <div className={clsx('group relative', className)}>
    {/* <!-- Dropdown toggle button --> */}
    {Element}
    {/* <!-- Dropdown menu --> */}
    <div
      className={clsx("absolute flex-col opacity-0 bg-gray-200 rounded-md shadow-xl dark:bg-gray-600 transition ease-out duration-500 overflow-x-hidden",
        'group-hover:flex group-hover:opacity-100',
        // "block opacity-100",
        {
          "origin-top-right": direction.y === 'top' && direction.x === 'right',
          "origin-bottom-right": direction.y === 'bottom' && direction.x === 'right',
          "origin-top-left": direction.y === 'top' && direction.x === 'left',
          "origin-bottom-left": direction.y === 'bottom' && direction.x === 'left',
        },
        {
          "left-0": direction.x === 'right',
          // "left-8": direction.x === 'right' && size === 'sm',
          // "left-14": direction.x === 'right' && size === 'md',
          // "left-20": direction.x === 'right' && size === 'lg',

          "right-0": direction.x === 'left',
          // "right-8": direction.x === 'left' && size === 'sm',
          // "right-14": direction.x === 'left' && size === 'md',
          // "right-20": direction.x === 'left' && size === 'lg',
        },
        {
          "translate-0": direction.y === 'top',
          "group-hover:-translate-y-[100%]": direction.y === 'top',
          "group-hover:-translate-y-[calc(100%+32px)]": direction.y === 'top' && size === 'sm',
          "group-hover:-translate-y-[calc(100%+56px)]": direction.y === 'top' && size === 'md',
          "group-hover:-translate-y-[calc(100%+80px)]": direction.y === 'top' && size === 'lg',

          "-translate-y-[100%]": direction.y === 'bottom',
          "-translate-y-[calc(100%+32px)]": direction.y === 'bottom' && size === 'sm',
          "-translate-y-[calc(100%+56px)]": direction.y === 'bottom' && size === 'md',
          "-translate-y-[calc(100%+80px)]": direction.y === 'bottom' && size === 'lg',
          "group-hover:translate-y-0": direction.y === 'bottom',
        },
      )}
    >
      {children}
    </div>
  </div>;
}

export default DropDown;