import React from "react";
import { FaUserSecret, FaMoon } from "react-icons/fa";

import { SiBlockchaindotcom } from "react-icons/si";
import { MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { connectWallet } from "../Services";
import { truncate, useGlobalState } from "../store";

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [theme, setTheme] = React.useState(window.localStorage.theme);
  const themeColor = theme === "dark" ? "light" : "dark";
  const darken = theme === "dark" ? true : false;

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [themeColor, theme]);

  const toggleLight = () => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(themeColor);
  };
  return (
    <div className="sticky top-0 z-50 dark:text-blue-500">
      <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-white dark:bg-[#212936]">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="grow flex justify-between items-center p-2">
            <Link
              to="/"
              className="flex justify-start items-center space-x-3"
              href={"/"}
            >
              <SiBlockchaindotcom size={25} />
              <span className="invisible md:invisible dark:text-gray-300">
                DAO
              </span>
            </Link>
            <div className="flex justify-center item-center space-x-5">
              {darken ? (
                <MdLightMode
                  size={25}
                  className="cursor-pointer"
                  onClick={toggleLight}
                />
              ) : (
                <FaMoon
                  size={25}
                  className="cursor-pointer"
                  onClick={toggleLight}
                />
              )}
              {truncate(connectedAccount, 4, 4, 11) || (
                <button
                  className="px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full shadow-md shadow-gray-400 hover:bg-blue-700  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg  dark:shadow-transparent hover:shadow-lg transition duration-150 ease-in-out dark:text-blue-500 dark:border dark:border-blue-500 dark:bg-transparent "
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
