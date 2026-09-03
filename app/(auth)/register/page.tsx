// \app\(auth)\register\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AuthResponse } from "@/lib/types";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  // تنظیم متغیر برای دریافت اطلاعات ار کاربر
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // تنظیم استیت جهت نمایش خطا و حالت لودینگ صفحه
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // نمایش پسورد هنگام ورود اطلاعات
  const [showPassword, setShowPassword] = useState(false);

  // تنظیم روتر جهت استفاده از توابع ناوبری
  const router = useRouter();

  // تابع ارسال اطلاعات به api
  const handleSubmit = async (e: React.FormEvent) => {
    // جلوگیری از رفرش صفحه
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // ارسال درخواست ثبت اطلاعات به api
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data: AuthResponse = await response.json();

      if (response.ok) {
        router.push("/login?registered=true");
      } else {
        setLoading(false);
        setError(data.error || "خطایی رخ داده");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(
          error.message || "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.",
        );
      } else {
        setError("خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        ایجاد حساب کاربری
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-200 p-6 lg:p-8 rounded-lg bg-white shadow-lg space-y-5 sm:space-y-6"
      >
        {/* نام */}
        <div>
          <label htmlFor="name" className="block mb-2">
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            placeholder="نام و نام خانوادگی"
            className="border border-gray-400 hover:border-gray-500 focus:border-transparent w-full rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          />
        </div>

        {/* ایمیل */}
        <div>
          <label htmlFor="email" className="block mb-2">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="آدرس ایمیل"
            className="border border-gray-400 hover:border-gray-500 focus:border-transparent w-full rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          />
        </div>

        {/* کلمه عبور */}
        <div>
          <label htmlFor="password" className="block mb-2">
            کلمه عبور
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="کلمه عبور"
              className="border border-gray-400 hover:border-gray-500 focus:border-transparent w-full rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
            <button
              type="button"
              aria-label="show password"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 cursor-pointer text-gray-600"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            حداقل 8 کاراکتر شامل حروف و اعداد
          </p>
        </div>

        <span>
          {error && (
            <p className="font-semibold text-red-500 text-center">{error}</p>
          )}
        </span>

        {/* دکمه ها */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
          >
            {loading ? "درحال ثبت نام..." : "ثبت نام"}
          </button>
        </div>

        <p className="border-t border-gray-300 pt-4 sm:pt-6 text-center sm:text-right">
          حساب کاربری دارید ؟{" "}
          <Link
            href={"/login"}
            className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300"
          >
            وارد شوید
          </Link>
        </p>
      </form>
    </main>
  );
}
