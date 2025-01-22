"use client";

import { ReactNode, useEffect, useState } from "react";
import SideNavBar from "./SideNavBar/SideNavBar";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "./NavBar/NavBar";

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/assistants");
    } else {
      router.push(pathname);
    }
  }, [pathname, router]);

  return (
    <div className="h-screen flex select-none">
      <SideNavBar />
      <div className="flex-1 flex flex-col">
        <div>
          <NavBar />
        </div>
        <div className="p-8 flex-1 overflow-y-auto bg-[#333333]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthProvider;
