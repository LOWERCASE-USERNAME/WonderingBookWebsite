import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="bg-white">
      <nav className="flex justify-between items-center mx-auto lg:px-8 p-6 max-w-7xl" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="w-auto h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex justify-center items-center -m-2.5 p-2.5 rounded-md text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="lg:flex lg:gap-x-12 hidden">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 font-semibold text-gray-900 text-sm leading-6">
              Product
              <ChevronDownIcon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="top-full -left-8 z-10 absolute bg-white shadow-lg mt-3 rounded-3xl w-screen max-w-md overflow-hidden ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="relative flex items-center gap-x-6 hover:bg-gray-50 p-4 rounded-lg text-sm leading-6 group"
                    >
                      <div className="group-hover:bg-white flex flex-none justify-center items-center bg-gray-50 rounded-lg w-11 h-11">
                        <item.icon className="group-hover:text-indigo-600 w-6 h-6 text-gray-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 bg-gray-50 divide-x divide-gray-900/5">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex justify-center items-center gap-x-2.5 hover:bg-gray-100 p-3 font-semibold text-gray-900 text-sm leading-6"
                    >
                      <item.icon className="flex-none w-5 h-5 text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          <a href="#" className="font-semibold text-gray-900 text-sm leading-6">
            Features
          </a>
          <a href="#" className="font-semibold text-gray-900 text-sm leading-6">
            Marketplace
          </a>
          <a href="#" className="font-semibold text-gray-900 text-sm leading-6">
            Company
          </a>
        </PopoverGroup>
        <div className="lg:flex lg:flex-1 lg:justify-end hidden">
          <a href="#" className="font-semibold text-gray-900 text-sm leading-6">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <MobileNavigation props={{ mobileMenuOpen, setMobileMenuOpen }} />
    </header>
  )
}

function MobileNavigation({ props }) {
  return (
    <Dialog className="lg:hidden" open={props.mobileMenuOpen} onClose={props.setMobileMenuOpen}>
      <div className="z-10 fixed inset-0" />
      <DialogPanel className="right-0 z-10 fixed inset-y-0 bg-white px-6 py-6 w-full sm:max-w-sm overflow-y-auto sm:ring-1 sm:ring-gray-900/10">
        <div className="flex justify-between items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="w-auto h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            className="-m-2.5 p-2.5 rounded-md text-gray-700"
            onClick={() => props.setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex justify-between items-center hover:bg-gray-50 py-2 pr-3.5 pl-3 rounded-lg w-full font-semibold text-base text-gray-900 leading-7">
                      Product
                      <ChevronDownIcon
                        className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                        aria-hidden="true"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="space-y-2 mt-2">
                      {[...products, ...callsToAction].map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block hover:bg-gray-50 py-2 pr-3 pl-6 rounded-lg font-semibold text-gray-900 text-sm leading-7"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
              <a
                href="#"
                className="block hover:bg-gray-50 -mx-3 px-3 py-2 rounded-lg font-semibold text-base text-gray-900 leading-7"
              >
                Features
              </a>
              <a
                href="#"
                className="block hover:bg-gray-50 -mx-3 px-3 py-2 rounded-lg font-semibold text-base text-gray-900 leading-7"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="block hover:bg-gray-50 -mx-3 px-3 py-2 rounded-lg font-semibold text-base text-gray-900 leading-7"
              >
                Company
              </a>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="block hover:bg-gray-50 -mx-3 px-3 py-2.5 rounded-lg font-semibold text-base text-gray-900 leading-7"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}