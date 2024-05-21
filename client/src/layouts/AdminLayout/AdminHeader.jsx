import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DropdownUser from "./DropdownUser";
import { CiMenuBurger } from "react-icons/ci";

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-9 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap- sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-999 block rounded-sm mx-5 border border-stroke text-2xl bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <CiMenuBurger />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
}

AdminHeader.propTypes = {
  sidebarOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setSidebarOpen: PropTypes.func.isRequired,
};
