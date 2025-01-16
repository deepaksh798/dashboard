import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHome } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { FiHash } from "react-icons/fi";
import { FiHeadphones } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { SlCallOut } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import { RiSettings3Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { IoLogoStackoverflow } from "react-icons/io5";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const SideNavBar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Helper function to determine if a route is active
  const isActive = (route: any) => pathname === route;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={
          "h-full bg-[#FAFBFC] text-white transform w-[290px] px-2 select-none border flex flex-col justify-between"
        }
      >
        <div>
          <div className="p-5 font-bold text-lg ">
            <Image src="/Logo.png" alt="" height={30} width={160} />
          </div>
          <div className="text-[#8A99AF] text-base font-semibold mt-8 px-6">
            MENU
          </div>

          <nav className="mt-4 text-[16px]">
            <ul className="text-black">
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/home") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <FiHome className="h-[18px] w-[18px]" />
                  Overview
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/user-management") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <FiHeadphones className="h-[18px] w-[18px]" />
                  Phone
                </li>
              </Link>
              <Link href="/assistants">
                <li
                  className={`p-2 m-4 flex items-center gap-2 rounded-lg ${
                    isActive("/assistants")
                      ? "bg-blue-200"
                      : "hover:bg-[#EAEBFF]"
                  }`}
                >
                  <RiRobot2Line className="h-[18px] w-[18px]" />
                  Assistants
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/payment") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <FiHash className="h-[18px] w-[18px]" />
                  Numbers
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed${
                    isActive("/report") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <IoLogoStackoverflow className="h-[18px] w-[18px]" />
                  Flows
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed${
                    isActive("/setting") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <FiPhoneCall className="h-[18px] w-[18px]" />
                  Calls
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/setting") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <FaRegCalendarCheck className="h-[18px] w-[18px]" />
                  Calendar
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/setting") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <SlCallOut className="h-[18px] w-[18px]" />
                  Integrations
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/setting") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <LuUsers className="h-[18px] w-[18px]" />
                  Users
                </li>
              </Link>
              <Link href="">
                <li
                  className={`text-[#666666] p-2 m-4 flex items-center gap-2 rounded-lg cursor-not-allowed ${
                    isActive("/setting") ? "bg-[#EAEBFF]" : ""
                  }`}
                >
                  <RiSettings3Line className="h-[18px] w-[18px]" />
                  Settings
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        <div>
          <Button className="w-full mb-8 bg-slate-300 hover:bg-slate-400 text-black font-semibold text-base h-12">
            <MdLogout className="h-10 w-10" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
