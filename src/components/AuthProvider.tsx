"use client";

import { ReactNode, useEffect, useState } from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  // const token = Cookies.get("password");

  // useEffect(() => {
  //   if (true) {
  //     setIsAuthenticated(true);
  //     if (pathname?.includes("/") || pathname === "/") {
  //       router.push("/assistants");
  //     } else {
  //       router.push(pathname);
  //     }
  //   } else {
  //     setIsAuthenticated(false);
  //     router.push("/login");
  //   }
  // }, [router]);

  // console.log("cookie -> ", token);

  useEffect(() => {
    if (pathname === "/") {
      router.push("/assistants");
    } else {
      router.push(pathname);
    }
  }, [pathname, router]);

  return (
    <div className="h-screen flex select-none">
      {/* <SideNavBar /> */}
      <div className="flex-1 flex flex-col">
        {/* <div>
            <NavBar />
          </div> */}
        <div className="p-8 flex-1 bg-[#FAFBFC] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthProvider;
