// \components\MobileMenu.tsx

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigations } from "@/data/navigations";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

interface MobileMenuProps{
  role: string;
}

export default function MobileMenu({role}: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <>
      <nav className="relative bg-surface p-4 border border-border shadow-sm z-40">
        {/* لوگو و دکمه منو */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-700"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* لوگو */}
          <Link href={"/"} className="flex items-center gap-1">
            <span className="font-medium mt-1">Boilerplate</span>

            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold mt-1">B</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* لینک های منو */}
      <div className="relative z-30">
        <ul
          className={`absolute top-0 pt-6 min-h-screen ${menuOpen ? "right-0" : "-right-full"} w-64 p-2 bg-surface h-full flex flex-col gap-4 border border-border shadow-sm transition-all duration-300`}
        >
          {navigations.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-semibold text-gray-600 px-4 py-2 border-b border-border  transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {role === "ADMIN" && (
              <li>
                <Link
                  href={"/admin"}
                  className="block text-lg font-semibold text-gray-600 px-4 py-2 border-b border-border transition-colors duration-200"
                >
                  پنل مدیر
                </Link>
              </li>
            )}

            {/* Logout Button */}
          <LogoutButton />
        </ul>
        
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 z-20 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-300`}
      />
    </>
  );
}

