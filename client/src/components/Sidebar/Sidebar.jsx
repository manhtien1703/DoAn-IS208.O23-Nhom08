import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import { MdOutlineDashboard } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { GrSchedules } from "react-icons/gr";
import { CiLink } from "react-icons/ci";

const isAdmin = true;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gray-300 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center z-9999 justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">
          <img src="images/logo.png" alt="Logo" />
        </Link>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {isAdmin ? (
                <>
                  <li className="mb-2">
                    <Link
                      to="dasboard"
                      className={` ${
                        pathname.includes("dasboard")
                          ? "bg-blue-700 text-white"
                          : "bg-transparent text-blue-600"
                      } group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-xl duration-300 ease-in-out hover:opacity-70 `}
                    >
                      <MdOutlineDashboard />
                      Bảng điều khiển
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/manager-dashboard/leave-request"
                      className={` ${
                        pathname.includes("leave-request")
                          ? "bg-blue-700 text-white"
                          : "bg-transparent text-blue-600"
                      } group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-xl duration-300 ease-in-out hover:opacity-70 `}
                    >
                      <FcLeave />
                      Yêu cầu nghỉ phép
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/manager-dashboard/meeting-schedule"
                      className={` ${
                        pathname.includes("meeting-schedule")
                          ? "bg-blue-700 text-white"
                          : "bg-transparent text-blue-600"
                      } group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-xl duration-300 ease-in-out hover:opacity-70 `}
                    >
                      <GrSchedules />
                      Tạo lịch họp
                    </Link>
                  </li>

                  <li className="mb-2">
                    <Link
                      to="/manager-dashboard/inter-unit"
                      className={` ${
                        pathname.includes("inter-unit")
                          ? "bg-blue-700 text-white"
                          : "bg-transparent text-blue-600"
                      } group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-semibold text-xl duration-300 ease-in-out hover:opacity-70 `}
                    >
                      <CiLink />
                      Xử lý yêu cầu liên đơn vị
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
