// \app\(auth)\login\page.tsx

import Link from "next/link";

export default function LoginPage(){
    return(
        <main className="min-h-screen p-4 flex flex-col gap-5 items-center justify-center">
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                ورود به حساب کاربری
            </h1>

            <form className="w-full max-w-md border border-gray-200 p-6 lg:p-8 rounded-lg bg-white shadow-lg space-y-5 sm:space-y-6">
                {/* ایمیل */}
                <div>
                    <label 
                    htmlFor="email"
                    className="block mb-2">
                        ایمیل
                    </label>
                    <input 
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="آدرس ایمیل" 
                    className="border border-gray-400 hover:border-gray-500 focus:border-transparent w-full rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"/>
                </div>

                {/* کلمه عبور */}
                <div>
                    <label 
                    htmlFor="password"
                    className="block mb-2">
                        کلمه عبور
                    </label>
                    <input
                    id="password"
                     type="password" 
                     minLength={8}
                     autoComplete="new-password"
                     placeholder="کلمه عبور" 
                     className="border border-gray-400 hover:border-gray-500 focus:border-transparent w-full rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"/>
                </div>

                {/* دکمه ها */}
                <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                        ورود
                    </button>
                </div>

                <p className="border-t border-gray-300 pt-4 sm:pt-6 text-center sm:text-right">
                    حساب کاربری ندارید ؟
                    {" "}
                    <Link
                    href={"/register"}
                    className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300">
                        ثبت نام کنید
                    </Link>
                </p>
            </form>
        </main>
    )
}