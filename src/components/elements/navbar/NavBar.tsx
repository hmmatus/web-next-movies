"use client";
import { menuOptions } from "@/utils/menuOptions";
import useScreenSize from "@/utils/screenSize";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
import styles from "./style.module.css";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUser } from "@/redux/slices/user";
import { logout } from "@/redux/slices/auth";

type MenuP = {
  isLoggedIn: boolean;
  onLogin(): void;
  onLogout(): void;
};
const MobileMenu = ({ isLoggedIn, onLogin, onLogout }: MenuP) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenu = [...menuOptions];

  return (
    <>
      <div className="flex flex-col">
        <button
          onClick={toggleMobileMenu}
          className="text-white text-lg focus:outline-none pr-4"
        >
          {isMobileMenuOpen ? (
            <MdMenuOpen size={40} />
          ) : (
            <MdOutlineMenu size={40} />
          )}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div
          className={`flex flex-col absolute right-0 top-8 ${styles["mobile-div"]}`}
        >
          {mobileMenu.map((elto) => (
            <Link
              className="text-white hover:text-black text-xl block m-4"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              key={elto.route}
              href={elto.route}
            >
              {elto.key.toUpperCase()}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              className="text-white hover:text-black text-xl block m-4"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-white hover:text-black text-xl block m-4"
              onClick={onLogin}
            >
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
};
const LaptopMenu = ({ isLoggedIn, onLogin, onLogout }: MenuP) => {
  const [options] = useState(menuOptions);
  return (
    <div className="flex items-center">
      {options.map((elto) => (
        <Link
          className="mx-2 font-bold text-white hover:text-black"
          key={elto.key}
          href={elto.route}
        >
          {elto.key.toUpperCase()}
        </Link>
      ))}
      {isLoggedIn ? (
        <button
          className="text-white hover:text-black text-xl block m-4"
          onClick={onLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="text-white hover:text-black text-xl block m-4"
          onClick={onLogin}
        >
          Login
        </button>
      )}
    </div>
  );
};
const NavBar = () => {
  const currentScreenSize = useScreenSize();
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const onLogout = () => {
    dispatch(removeUser());
    dispatch(logout());
  };

  const onLogin = () => {
    router.push("/login");
  };
  useEffect(() => {
    setScreenSize(currentScreenSize);
  }, [currentScreenSize]);
  return (
    <nav className="bg-primary min-h-20 px-4 flex justify-between items-center ">
      <button onClick={() => router.replace("/")}>
        <Image
          loading="lazy"
          alt="logo"
          width={80}
          height={80}
          src={"/images/logo.png"}
        />
      </button>
      {screenSize?.width >= 1024 ? (
        <LaptopMenu
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      ) : (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      )}
    </nav>
  );
};

export default NavBar;
