import { useEffect, useRef, useState } from "react";
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
import { CircleUserRound, LogOut, Menu, NotebookPen, PenLine, Rss, Search, Trash2 } from "lucide-react";
import DropdownMenu from "../complex/inputs/dropdown-menu.component";
import { getCurrentUser, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getArticlesByBook } from "../../services/articleService";
import { LocalBooksAutocomplete } from "../complex/inputs/local-book-autocomplete";
import { Book } from "../../types/book";

interface NavigationProps {
  userInfo: object | null;
  setUserInfo: (userInfo: object | null) => void;
}

export default function Navigation({ userInfo, setUserInfo }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSearchByQuery, setIsSearchByQuery] = useState(false);
  const navigate = useNavigate();

  const token = getCurrentUser();
  const decodedToken = token && jwtDecode(token);
  const email = decodedToken && String(decodedToken.email);

  const handleSearch = async (book: Book | null) => {
    setSelectedBook(book);
    if (book) {
      navigate(`/search?bookid=${book.id}`);
    }
  }

  useEffect(() => {
    if (isSearchByQuery) {
      navigate(`/search?query=${searchInput}`);
      setIsSearchByQuery(false);
    }
  }, [isSearchByQuery, searchInput, navigate]);

  return (
    <header className="h-20 bg-[#FCF6EF]">
      <nav
        className="flex items-center justify-between h-full mx-auto max-w-7xl lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Mood Book</span>
            <div className="flex flex-row items-end w-auto h-8">
              <h1 className="text-4xl italic font-normal text-[#124135]">Moodbook</h1>
            </div>
          </a>
        </div>
        <div className="flex justify-end flex-1 lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <div className="relative hidden -translate-x-24 lg:flex lg:flex-1">
          <LocalBooksAutocomplete
            setIsSearchByQuery={setIsSearchByQuery}
            handleInputChange={(newValue) => setSearchInput(newValue)}
            handleBookChange={handleSearch}
            className="pl-8 pr-4 py-1 bg-[#a7a2a2ad]/[0.2] outline-none rounded-2xl w-72 text-sm text-nowrap"
            placeholder="Ý tưởng, chủ đề và tìm kiếm" />
          <Search className="absolute left-0 translate-x-1/2 -translate-y-1/2 top-1/2" size={16} />
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/explore" className="font-semibold leading-6 text-gray-900">
            Khám phá
          </a>
          <a href="/community" className="font-semibold leading-6 text-gray-900">
            Cộng đồng
          </a>
          <a href="/aboutus" className="font-semibold leading-6 text-gray-900">
            Về chúng tôi
          </a>
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
              { label: "Quản lý nội dung" },
              { label: "Tạo bài viết", icon: <PenLine size={16} strokeWidth={2.5} />, action: () => navigate(`/studio`) },
              { label: "Thông tin", icon: <NotebookPen size={16} strokeWidth={2.5} />, action: () => navigate(`/info`) },
              { label: "Quản lý tài khoản" },
              { label: "Hồ sơ", icon: <Menu size={16} strokeWidth={2.5} />, action: () => navigate(`/profile`) },
              {
                label: "Đăng xuất", icon: <LogOut size={16} strokeWidth={2.5} />, action: () => {
                  logout()
                  setUserInfo(null);
                  navigate('/home');
                }, className: "text-red-700 hover:bg-red-100 hover:text-red-900"
              },
            ]}
            className="hidden translate-x-1/2 lg:flex lg:flex-1" />

        ) : (
          <button className="hidden lg:flex lg:flex-1 lg:justify-end ">
            <a href="/login" className="font-semibold leading-6 text-gray-900 bg-[#E1DCC5] px-4 py-2 rounded-2xl">
              Đăng nhập <span aria-hidden="true">&rarr;</span>
            </a>
          </button>
        )
        }

      </nav >
      <MobileNavigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </header >
  );
}

function MobileNavigation({ mobileMenuOpen, setMobileMenuOpen, userInfo, setUserInfo }) {
  const navigate = useNavigate();
  const token = getCurrentUser();
  const decodedToken = token && jwtDecode(token);
  const email = decodedToken && String(decodedToken.email);

  return (
    <Dialog
      className="relative lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Mood Book</span>
            <h1 className="text-4xl italic font-normal text-[#124135]">Moodbook</h1>
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flow-root mt-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="py-6 space-y-2">
              <a
                href="/explore"
                className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
              >
                Khám phá
              </a>
              <a
                href="/community"
                className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
              >
                Cộng đồng
              </a>
              <a
                href="/aboutus"
                className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
              >
                Về chúng tôi
              </a>
            </div>
            <div className="absolute bottom-0 py-6 ">
              {token ? (
                <div className="space-y-2">
                  <span>Hello, {email.substring(0, email.indexOf('@'))}</span>
                  <button
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-red-700 rounded-lg hover:bg-red-100 hover:text-red-900"
                    onClick={() => {
                      logout();
                      setUserInfo(null);
                      navigate("/home");
                    }}
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

