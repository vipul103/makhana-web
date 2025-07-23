"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState, useEffect } from "react";
import { Menu, Search } from "@/svg";
import { RootState } from "@/redux/store";
import default_user from "@assets/img/users/user-10.jpg";
import NotificationArea from "./component/notification-area";
import { userLoggedOut } from "@/redux/auth/authSlice";

// prop type
type IProps = {
  setSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setSideMenu }: IProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchOverlay, setSearchOverlay] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const pRef = useRef<HTMLDivElement>(null);
  const nRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  // handle logout
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    router.push(`/login`);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!pRef?.current?.contains(e.target)) {
        setProfileOpen(false);
      }
      if (!nRef?.current?.contains(e.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [pRef, nRef]);

  const handleNotificationOpen = () => {
    setNotificationOpen(!notificationOpen);
    setProfileOpen(false);
  };
  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(false);
  };

  return (
    <>
      <header className="relative z-10 bg-white border-b border-gray border-solid py-5 px-8 pr-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-6 lg:space-x-0">
            <button
              onClick={() => setSideMenu((prev) => !prev)}
              type="button"
              className="block lg:hidden text-2xl text-black"
            >
              <Menu />
            </button>
            <div className="w-[30%] hidden md:block">
              <form action="#">
                <div className="w-[250px] relative">
                  <input
                    className="input h-12 w-full pr-[45px]"
                    type="text"
                    placeholder="Search Here..."
                  />
                  <button className="absolute top-1/2 right-6 translate-y-[-50%] hover:text-theme">
                    <Search />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-6">
            <div className="md:hidden">
              <button className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-textBody border border-gray hover:bg-themeLight hover:text-theme hover:border-themeLight">
                <Search />
              </button>
            </div>
            <div className="relative">
              {/* notification area start */}
              <NotificationArea
                nRef={nRef}
                notificationOpen={notificationOpen}
                handleNotificationOpen={handleNotificationOpen}
              />
              {/* notification area end */}
            </div>
            <div
              ref={pRef}
              className="relative w-[70%] flex justify-end items-center"
            >
              <button
                onClick={handleProfileOpen}
                className="relative"
                type="button"
              >
                {user?.image ? (
                  <Image
                    className="w-[40px] h-[40px] rounded-md"
                    src={user.image}
                    alt="user-img"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : (
                  <Image
                    className="w-[40px] h-[40px] rounded-md"
                    src={default_user}
                    alt="user-img"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                )}
                <span className="w-[12px] h-[12px] inline-block bg-green-500 rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white"></span>
              </button>

              {profileOpen && (
                <div className="absolute w-[280px] top-full right-0 shadow-lg rounded-md bg-white py-5 px-5">
                  <div className="flex items-center space-x-3 border-b border-gray pb-3 mb-2">
                    <div>
                      <Image
                        className="w-[50px] h-[50px] rounded-md"
                        src={user?.image ? user.image : default_user}
                        alt="user-img"
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <div>
                      <h5 className="text-base mb-1 leading-none">
                        {user?.name}
                      </h5>
                      <p className="mb-0 text-tiny leading-none">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link
                        href="/dashboard"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleLogOut}
                        style={{ cursor: "pointer" }}
                        className="px-5 py-2 w-full block hover:bg-gray rounded-md hover:text-theme text-base"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*  search  */}
        <div
          className={`fixed top-0 left-0 w-full bg-white p-10 z-50 transition-transform duration-300 md:hidden ${
            searchOverlay
              ? "translate-y-[0px]"
              : " -translate-y-[230px] lg:translate-y-[0]"
          }`}
        >
          <form action="#">
            <div className="relative mb-3">
              <input
                className="input h-12 w-full pr-[45px]"
                type="text"
                placeholder="Search Here..."
              />
              <button className="absolute top-1/2 right-6 translate-y-[-50%] hover:text-theme">
                <Search />
              </button>
            </div>
          </form>
          <div className="">
            <span className="text-tiny mr-2">Keywords :</span>
            <a
              href="#"
              className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
            >
              Customer
            </a>
            <a
              href="#"
              className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
            >
              Product
            </a>
            <a
              href="#"
              className="inline-block px-3 py-1 border border-gray6 text-tiny leading-none rounded-[4px] hover:text-white hover:bg-theme hover:border-theme"
            >
              Orders
            </a>
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${
            searchOverlay ? "visible opacity-1" : "  invisible opacity-0 "
          }`}
        ></div>
      </header>
    </>
  );
};

export default Header;
