"use client";
import React, { useState } from "react";
import Image from "next/image";
import sidebar_menu from "@/data/sidebar-menus";
import { DownArrow } from "@/svg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";

// prop type
type IProps = {
  sideMenu: boolean;
  setSideMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({sideMenu,setSideMenu}:IProps) {
  const [isDropdown, setIsDropDown] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  // handle active menu
  const handleMenuActive = (title: string) => {
    if (title === isDropdown) {
      setIsDropDown("");
    } else {
      setIsDropDown(title);
    }
  };

   // handle logout
   const handleLogOut = () => {
    dispatch(userLoggedOut());
    router.push(`/login`);
  };
  return (
    <>
      <aside
        className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray overflow-y-auto sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${sideMenu? "translate-x-[0px]" : " -translate-x-[300px] lg:translate-x-[0]"}`}
      >
        <div className="flex flex-col justify-between h-full">
          <div >

            <div className="py-4 pb-8 px-8 border-b border-gray h-[78px]">
              <Link href="/dashboard">
                <Image
                  className="w-[140px]"
                  width={140}
                  height={43}
                  src="/assets/img/logo/logo.svg"
                  alt="logo"
                  priority
                />
              </Link>
            </div>
            <div className="px-4 py-5">
              <ul>
                {sidebar_menu.map((menu) => (
                  <li key={menu.id}>
                    {!menu.subMenus && menu.title !== 'Online store' && (
                      <Link
                        href={menu.link}
                        onClick={() => handleMenuActive(menu.title)}
                        className={`group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active`}
                      >
                        <span className="inline-block mr-[10px] text-xl">
                          <menu.icon />
                        </span>
                        {menu.title}

                        {menu.subMenus && (
                          <span className="absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4">
                            <DownArrow />
                          </span>
                        )}
                      </Link>
                    )}
                    {menu.subMenus && (
                      <a
                        onClick={() => handleMenuActive(menu.title)}
                        className={`group cursor-pointer rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active ${isDropdown === menu.title ? "bg-themeLight hover:bg-themeLight text-theme": ""}`}
                      >
                        <span className="inline-block mr-[10px] text-xl">
                          <menu.icon />
                        </span>
                        {menu.title}

                        {menu.subMenus && (
                          <span className="absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4">
                            <DownArrow />
                          </span>
                        )}
                      </a>
                    )}
                    {menu.title === 'Online store' && (
                      <a
                        href="https://hamart-shop.vercel.app"
                        target="_blank"
                        className={`group cursor-pointer rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray sidebar-link-active`}
                      >
                        <span className="inline-block mr-[10px] text-xl">
                          <menu.icon />
                        </span>
                        {menu.title}
                      </a>
                    )}

                    {menu.subMenus && (
                      <ul
                        className={`pl-[42px] pr-[20px] pb-3 ${isDropdown === menu.title ? "block" : "hidden"}`}
                      >
                        {menu.subMenus.map((sub, i) => (
                          <li key={i}>
                            <Link
                              href={sub.link}
                              className="block font-normal w-full text-[#6D6F71] hover:text-theme nav-dot"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mb-6">
            <button onClick={handleLogOut} className="tp-btn px-7 py-2">Logout</button>
          </div>
        </div>
      </aside>

      <div
        onClick={() => setSideMenu(!sideMenu)}
        className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${sideMenu ? "visible opacity-1" : "  invisible opacity-0 "}`}
      >
        {" "}
      </div>
    </>
  );
}
