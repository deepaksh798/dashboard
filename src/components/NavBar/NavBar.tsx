"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TiArrowSortedDown } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavBar = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("password");
    router.push("/login");
  };

  return (
    <div className="w-full h-full bg-[#141414] p-3 px-8 flex justify-between select-none">
      <div className="relative w-[366px] h-full flex items-center">
        <span className="absolute left-[10px]">
          <Icon
            icon="iconamoon:search-thin"
            width="24"
            height="24"
            className="text-[#757575]"
          />
        </span>
        <Input
          type="text"
          id="text"
          placeholder="Search Something"
          className="h-full bg-[#333333] border-none pl-10"
        />
      </div>
      <div className="flex gap-8">
        <div className="h-full flex items-center text-[#8F8F8F]">
          <Icon icon="clarity:notification-line" width="24" height="24" />
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:bg-[#333333]">
              <Button className="p-0 border-none" variant="outline">
                <img
                  src={
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="user-profile"
                  className="h-9 w-9 rounded-full object-cover object-top"
                />
                <Icon
                  icon="eva:arrow-down-fill"
                  width="24"
                  height="24"
                  className="text-[#8F8F8F]"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#414141] text-white border-none">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#666666]" />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#666666]" />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="bg-[#414141] text-white border-none">
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#666666]" />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-[#666666]" />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#666666]" />
              <DropdownMenuItem onClick={() => handleLogout()}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
