// \components\Header.tsx

import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { navigations } from "@/data/navigations";


export default function Header() {
  
  return (
    <>
    {/* منوی ویندوز */}
      <header className="hidden md:block bg-white shadow-sm border-b border-gray-200 mb-8 px-6">
        
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          {/* لوگو */}
          <Link href={"/"} className="flex items-center gap-1">
            <span className="font-medium mt-1">Boilerplate</span>

            <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold mt-1">B</span>
            </div>
          </Link>

          {/* لینک های منو */}
          <ul className="flex items-center gap-4">
            {navigations.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="hover:bg-gray-300 text-gray-600 hover:text-gray-800 px-4 py-4 rounded-md transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* دکمه logout */}
          <LogoutButton />
        </div>        
      </header>     
    </>
  );
}
