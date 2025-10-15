"use client";

import Link from "next/link";

import { MenuItem } from "@/shared/components/common";
import {
  IconChevronDoubleLeft,
  IconChevronDoubleRight,
} from "@/shared/components/icons";
import { menuItems } from "@/shared/constants/menu-constant";
import { useSidebarContext } from "@/shared/contexts";
import { cn } from "@/shared/utils";

const Sidebar = () => {
  const { isButtonActive, isOpen, setIsButtonActive, setIsOpen } =
    useSidebarContext();
  const handleToggleSidebar = () => {
    if (isButtonActive) {
      // Nếu đang bật button (hover được) => bấm lần nữa thì tắt hover, sidebar mở cố định
      setIsButtonActive(false);
      setIsOpen(true);
    } else {
      // Nếu button đang tắt => bấm thì bật button (cho phép hover), sidebar đóng
      setIsButtonActive(true);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "bgDarkMode fixed inset-y-0 left-0 hidden flex-col z-20 whitespace-nowrap border-r border-gray-300 dark:border-gray-600 p-5 lg:flex transition-all ease-in-out",
        isOpen ? "w-[300px] duration-300" : "w-[80px] duration-500",
      )}
      onMouseEnter={() => {
        if (isButtonActive) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (isButtonActive) setIsOpen(false);
      }}
    >
      <div className="flex items-center">
        <Link
          className="mb-5 inline-flex h-10 items-center justify-center gap-2 self-start text-2xl font-bold"
          href="/"
        >
          <span
            className={cn(
              "bgDarkMode borderDarkMode flex size-10 items-center justify-center rounded-lg border text-primary transition-all",
              isOpen ? "text-5xl" : "text-4xl",
            )}
          >
            <svg
              className="rounded-lg"
              height="50"
              viewBox="0 0 32 32"
              width="50"
            >
              <defs>
                <linearGradient cx="50%" cy="30%" id="mysticGradient" r="70%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="30%" stopColor="#EC4899" />
                  <stop offset="60%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur result="coloredBlur" stdDeviation="2" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect fill="url(#mysticGradient)" height="32" rx="8" width="32" />

              {/* Mystical orb/crystal */}
              <circle
                cx="16"
                cy="12"
                fill="white"
                filter="url(#glow)"
                opacity="0.9"
                r="6"
              />
              <circle
                cx="16"
                cy="12"
                fill="url(#mysticGradient)"
                opacity="0.6"
                r="4"
              />
              <circle cx="14" cy="10" fill="white" opacity="0.8" r="1.5" />

              {/* Knowledge rays */}
              <path
                d="M16 6 L16 2"
                opacity="0.7"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <path
                d="M22 12 L26 12"
                opacity="0.7"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <path
                d="M16 18 L16 22"
                opacity="0.7"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <path
                d="M10 12 L6 12"
                opacity="0.7"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="1.5"
              />

              {/* Floating particles */}
              <circle cx="8" cy="8" fill="#F59E0B" opacity="0.8" r="0.8" />
              <circle cx="24" cy="8" fill="#EC4899" opacity="0.7" r="0.6" />
              <circle cx="8" cy="24" fill="#8B5CF6" opacity="0.6" r="0.7" />
              <circle cx="24" cy="24" fill="#1E40AF" opacity="0.8" r="0.5" />

              {/* Base platform */}
              <ellipse
                cx="16"
                cy="26"
                fill="white"
                opacity="0.3"
                rx="8"
                ry="2"
              />
            </svg>
          </span>
          <div className={isOpen ? "block" : "hidden"}>
            <span className="text-lg font-bold text-gray-800 dark:text-secondary">
              MysticLearn
            </span>
            <span className="ml-1 rounded bg-gradient-to-r from-primary to-secondary px-1.5 py-0.5 text-xs text-white">
              Academy
            </span>
          </div>
        </Link>
        {!!isOpen && (
          <button
            className={cn(
              "absolute -right-4 top-5 z-10 flex size-8 items-center justify-center rounded-full bg-[#FF9F43] text-white shadow transition-all duration-300 ease-in-out",
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={handleToggleSidebar}
          >
            {isButtonActive ? (
              <IconChevronDoubleRight className="size-4" /> // button true
            ) : (
              <IconChevronDoubleLeft className="size-4" /> // button false
            )}
          </button>
        )}
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            icon={item.icon}
            onlyIcon={!isOpen}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
      {/* <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {userId ? (
          <UserButton />
        ) : (
          <Link
            className="flex size-10 items-center justify-center rounded-lg bg-primary p-1 text-white"
            href="/sign-in"
          >
            <IconUsers />
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default Sidebar;
