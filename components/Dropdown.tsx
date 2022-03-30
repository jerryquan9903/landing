import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

interface DropdownProps {
  className?: string,
  text: string,
  values: string[],
  onChange: (val: string, index: number) => void
}

const Dropdown = ({ className = "", text, values, onChange }: DropdownProps) => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className={className}>
            {text}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-black"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 min-w-[12rem] mt-2 origin-top-right bg-white divide-y divide-neutral-200 rounded-md ring-1 ring-black ring-opacity-10 focus:outline-none">
            {values[0] && values.map((val, index) => (
              <Menu.Item key={val} onClick={() => onChange(val, index)}>
                {({ active }) => (
                  <div className={`p-1 cursor-pointer`}>
                    <div className={`px-2 py-1 font-medium rounded ${active ? 'bg-neutral-200' : ''}`}>{val}</div>
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Dropdown;


