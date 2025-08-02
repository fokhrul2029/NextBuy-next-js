"use client";
import Link from "next/link";
import { useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import SideBar from "./sections/SideBar";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navItems = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Orders",
      to: "/orders",
    },
  ];

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Banner/Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"} className="text-2xl font-bold text-gray-900">
              NextBuy
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.to}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li
                onClick={() => setIsCartOpen(true)}
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-50 relative"
              >
                <MdShoppingCart />
              </li>
            </ul>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Fixed Overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.to}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
