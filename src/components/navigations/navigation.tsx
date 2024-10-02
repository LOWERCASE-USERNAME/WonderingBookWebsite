import { useState } from "react";
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
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { RoundedImage } from "../basic/rounded-image.component";
import { CircleUserRound, LogOut, Menu, NotebookPen, Search, Trash2 } from "lucide-react";
import DropdownMenu from "../complex/inputs/dropdown-menu.component";
import { getCurrentUser, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface NavigationProps {
  userInfo: object | null;
  setUserInfo: (userInfo: object | null) => void;
}

export default function Navigation({ userInfo, setUserInfo }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = getCurrentUser();
  const decodedToken = token && jwtDecode(token);
  const email = decodedToken && String(decodedToken.email);

  return (
    <header className="h-20 bg-white">
      <nav
        className="flex items-center justify-between h-full mx-auto max-w-7xl lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Mood Book</span>
            <div className="flex flex-row items-end w-auto h-8">
              {/* <img
                className="w-auto h-full"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
              <h1 className="text-4xl italic font-normal text-[#124135]">Moodbook</h1>
            </div>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="relative flex -translate-x-24 lg:flex-1">
          <input
            className="pl-8 pr-4 py-2 bg-[#a7a2a2ad]/[0.2] outline-none rounded-2xl w-72 text-sm"
            placeholder="Ý tưởng, chủ đề và tìm kiếm" spellCheck={false} />
          <Search className="absolute left-0 translate-x-1/2 -translate-y-1/2 top-1/2" size={16} />
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/explore" className="font-semibold leading-6 text-gray-900">
            Khám phá
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center font-semibold leading-6 text-gray-900 gap-x-1">
              Danh mục
              <ChevronDownIcon
                className="flex-none w-6 h-6 text-gray-400"
                aria-hidden="true"
              />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-md mt-3 overflow-hidden bg-white shadow-lg -left-8 top-full rounded-3xl ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="flex-none w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
          <a href="/aboutus" className="font-semibold leading-6 text-gray-900">
            Về chúng tôi
          </a>
          {/* <a href="#" className="font-semibold leading-6 text-gray-900">
            Company
          </a> */}
        </PopoverGroup>

        {token ? (
          <DropdownMenu
            buttonIcon={
              <div className="items-center hidden gap-2 lg:flex lg:flex-1 lg:justify-end">
                <span>Hello, {email.substring(0, email.indexOf('@'))}!</span>
                <RoundedImage src="/default_user_icon.svg" className="w-10 h-10 bg-[#E1DCC5] p-1 border-none" />
              </div>}
            buttonLabel=""
            options={[
              { label: "Tài khoản", icon: <Menu />, action: () => navigate(`/account`) },
              { label: "Thông tin", icon: <NotebookPen />, action: () => navigate(`/info`) },
              {
                label: "Đăng xuất", icon: <LogOut />, action: () => {
                  logout()
                  setUserInfo(null);
                }
              },
            ]}
            className="translate-x-1/2" />

        ) : (
          <button className="hidden lg:flex lg:flex-1 lg:justify-end ">
            <a href="/login" className="font-semibold leading-6 text-gray-900 bg-[#E1DCC5] px-4 py-2 rounded-2xl">
              Đăng nhập <span aria-hidden="true">&rarr;</span>
            </a>
          </button>
        )
        }

      </nav >
      {/* <MobileNavigation props={{ mobileMenuOpen, setMobileMenuOpen }} /> */}
    </header >
  );
}

// function MobileNavigation({ props }) {
//   return (
//     <Dialog
//       className="lg:hidden"
//       open={props.mobileMenuOpen}
//       onClose={props.setMobileMenuOpen}
//     >
//       <div className="fixed inset-0 z-10" />
//       <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//         <div className="flex items-center justify-between">
//           <a href="#" className="-m-1.5 p-1.5">
//             <span className="sr-only">Your Company</span>
//             <img
//               className="w-auto h-8"
//               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//               alt=""
//             />
//           </a>
//           <button
//             type="button"
//             className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             onClick={() => props.setMobileMenuOpen(false)}
//           >
//             <span className="sr-only">Close menu</span>
//             <XMarkIcon className="w-6 h-6" aria-hidden="true" />
//           </button>
//         </div>
//         <div className="flow-root mt-6">
//           <div className="-my-6 divide-y divide-gray-500/10">
//             <div className="py-6 space-y-2">
//               <Disclosure as="div" className="-mx-3">
//                 {({ open }) => (
//                   <>
//                     <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
//                       Product
//                       <ChevronDownIcon
//                         className={classNames(
//                           open ? "rotate-180" : "",
//                           "h-5 w-5 flex-none",
//                         )}
//                         aria-hidden="true"
//                       />
//                     </DisclosureButton>
//                     <DisclosurePanel className="mt-2 space-y-2">
//                       {[...products, ...callsToAction].map((item) => (
//                         <DisclosureButton
//                           key={item.name}
//                           as="a"
//                           href={item.href}
//                           className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
//                         >
//                           {item.name}
//                         </DisclosureButton>
//                       ))}
//                     </DisclosurePanel>
//                   </>
//                 )}
//               </Disclosure>
//               <a
//                 href="#"
//                 className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
//               >
//                 Features
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
//               >
//                 Marketplace
//               </a>
//               <a
//                 href="#"
//                 className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
//               >
//                 Company
//               </a>
//             </div>
//             <div className="py-6">
//               <a
//                 href="#"
//                 className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//               >
//                 Log in
//               </a>
//             </div>
//           </div>
//         </div>
//       </DialogPanel>
//     </Dialog>
//   );
// }
