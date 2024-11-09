import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowLeft, Search } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ThemeToggleButton from "./theme-toggler-button";
// import FacebookMessengerIcon from "@/public/header/facebook-messeneger";
import Messenger from "@/components/messenger";
const SearchBar = () => {
  const { theme } = useTheme();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!showSearchBar) return;
if(inputRef.current){
  inputRef.current.focus()
}
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showSearchBar]);

  return (
    <div className="relative w-full ">
      {/* Search Input View */}
      <div
        className={`absolute  w-full transform transition-all duration-200 ease-in-out ${
          showSearchBar
            ? "translate-x-0 opacity-100"
            : "translate-x-[100%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex gap-x-5 grow justify-start items-center">
          <button
            onClick={() => setShowSearchBar(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full 
                       transition-all duration-200"
            aria-label="Back"
          >
            <ArrowLeft width={20} height={20} />
          </button>
          <div className="flex relative -ml-3 w-full max-w-md">
            <Search
              stroke="gray"
              width={18}
              height={18}
              className={`transition-opacity ${
                typing ? "opacity-0" : "opacity-100"
              } absolute top-1/2 -translate-y-1/2 left-3 `}
            />
            <input
              className="w-full border rounded-3xl py-2 px-4 pl-10 
                         focus:outline-none
                         dark:bg-gray-800 dark:border-gray-700
                         transition-colors duration-200"
              placeholder="Search Connect"
              ref={inputRef}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                if (!e.target.value) return setTyping(false);
                setTyping(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Header View */}
      <div
        className={`transform transition-all duration-200 ease-in-out ${
          showSearchBar
            ? "translate-x-[-100%] opacity-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        }`}
      >
        <div className="flex grow justify-between">
          <div className="flex gap-x-5 items-center">
            <Image
              className="size-[30px] scale-125"
              src={`/header/connect-logo-${
                theme === "light" ? "lighttheme" : "darktheme"
              }.png`}
              alt="connect logo"
              width={30}
              height={30}
              priority
            />
            <button
              className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark p-2.5 
                         hover:bg-gray-200 dark:hover:bg-gray-700 
                         transition-all duration-200"
              onClick={() => setShowSearchBar(true)}
              aria-label="Open search"
            >
              <Search stroke="gray" width={20} height={20} />
            </button>
          </div>
          <div className="flex gap-x-2 transition-all duration-200">
            <ThemeToggleButton />
            {/* <button
              className="rounded-full bg-icon-bg-light dark:bg-icon-bg-dark  pb-1 pr-1
                         hover:bg-gray-200 dark:hover:bg-gray-700 
                         transition-all duration-200"
              aria-label="Open messenger"
            >
              <FacebookMessengerIcon />
            </button> */}
            <Messenger />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
