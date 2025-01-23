import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const SideNavBar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Helper function to determine if a route is active
  const isActive = (route: any) => pathname === route;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={
          "h-full bg-[#141414] transform w-[120px] px-2 select-none flex flex-col justify-between"
        }
      >
        <div className="flex flex-col items-center mt-9">
          <div className="relative h-[30px] w-[33px] p-5 font-bold text-lg ">
            <Image src="/Logo.png" alt="" fill />
          </div>
          <div className="text-[#8A99AF] text-base font-semibold mt-8 px-6"></div>

          <nav className="mt-4 text-[16px]">
            <ul className="text-[#ADADAD] space-y-4">
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/home") ? "bg-[#D7FE66] text-[#141414]" : ""
                  }`}
                >
                  <Icon
                    icon="material-symbols:dashboard-rounded"
                    width="24"
                    height="24"
                  />
                </li>
              </Link>
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon icon="mdi:headset" width="24" height="24" />
                </li>
              </Link>
              <div className="relative group">
                <Link href="/assistants" className="flex justify-center">
                  <li
                    className={`flex items-center justify-center h-11 w-11 rounded-xl ${
                      isActive("/assistants")
                        ? "bg-[#D7FE66] text-[#141414]"
                        : ""
                    }`}
                  >
                    <Icon
                      icon="fluent:headset-vr-24-filled"
                      width="24"
                      height="24"
                    />
                  </li>
                </Link>
                {/* Tooltip */}
                <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-[#D7FE66] text-sm font-medium px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Assistants
                </span>
              </div>
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon icon="ic:round-contact-page" width="24" height="24" />
                </li>
              </Link>
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon
                    icon="material-symbols-light:flowchart-sharp"
                    width="24"
                    height="24"
                  />
                </li>
              </Link>
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon
                    icon="mingcute:phone-call-fill"
                    width="24"
                    height="24"
                  />
                </li>
              </Link>
              {/* //// */}

              <div className="relative group">
                <Link href="/calendar" className="flex justify-center">
                  <li
                    className={`flex items-center justify-center h-11 w-11 rounded-xl ${
                      isActive("/calendar") ? "bg-[#D7FE66] text-[#141414]" : ""
                    }`}
                  >
                    <Icon icon="uis:calender" width="24" height="24" />
                  </li>
                </Link>
                {/* Tooltip */}
                <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-800 text-[#D7FE66] text-sm font-medium px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Calendar
                </span>
              </div>
              {/* ///// */}
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon
                    icon="ic:round-integration-instructions"
                    width="24"
                    height="24"
                  />
                </li>
              </Link>
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon icon="mage:users-fill" width="24" height="24" />
                </li>
              </Link>
              <Link href="" className="flex justify-center">
                <li
                  className={`flex items-center justify-center h-11 w-11 rounded-xl cursor-not-allowed ${
                    isActive("/user-management")
                      ? "bg-[#D7FE66] text-[#141414]"
                      : ""
                  }`}
                >
                  <Icon icon="weui:setting-filled" width="24" height="24" />
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center items-center">
          <div className=" text-white flex justify-center items-center bg-[#333333] mb-9 h-11 w-11 rounded-xl">
            <Icon
              icon="material-symbols:logout-rounded"
              width="24"
              height="24"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
