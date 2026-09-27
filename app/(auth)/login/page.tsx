// \app\(auth)\login\page.tsx

"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ApiResponse } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import type { PublicUser } from "@/lib/types";
import Input from "@/components/ui/Input";

function LoginForm() {
  // تنظیم متغیر های مربوطه برای درسافت اطلاعات ار فرم
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // تنظیم استیت جهت نمایش خطا و حالت لودینگ صفحه
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // نمایش پسورد هنگام ورود اطلاعات
  const [showPassword, setShowPassword] = useState(false);

  // تنظیم متغیر برای استفاده از router, searchParams
  const router = useRouter();
  const searchParams = useSearchParams();

  // متغیر جهت بررسی اینکه آیا کاربر بعد از ثبت وارد این صفحه شده یا خیر
  const registered = searchParams.get("registered");

  const resetSuccess = searchParams.get("reset") === "success";

  // تابع ارسال اطلاعات کاربر
  const handleSubmit = async (e: React.FormEvent) => {
    // جلوگیری از رفرش صفحه
    e.preventDefault();

    setLoading(true);
    setError("");

    // ارسال اطلاعات جهت بررسی و ورود
    try {
      // ارسال درخواست به api
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: ApiResponse<PublicUser> = await response.json();

      if (response.ok) {
        if (data.data?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setLoading(false);
        setError(data.error || "خطایی رخ داده");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        ورود به حساب کاربری
      </h1>

      {resetSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
          <p className="text-success text-center">
            ✅ رمز عبور با موفقیت تغییر کرد. اکنون وارد شوید.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-border p-6 lg:p-8 rounded-lg bg-background shadow-lg space-y-5 sm:space-y-6"
      >
        {/* ایمیل */}
        <Input
          label="ایمیل"
          id="email"
          type="email"
          value={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* کلمه عبور */}
        <Input
          label="رمز عبور"
          id="password"
          type="password"
          value={password}
          error={error}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* پیام ها */}
        <div>
          {/* پیغام ثبت موفق */}
          <span>
            {registered && (
              <p className="text-center text-success font-semibold">
                کاربر با موفقیت ثبت شد. لطفا وارد شوید
              </p>
            )}
          </span>
        </div>

        {/* دکمه ها */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            disabled={loading}
            type="submit"
            className="w-full sm:w-auto disabled:cursor-not-allowed bg-primary hover:bg-primary-hover disabled:bg-primary-disabled text-background px-6 py-3 rounded-lg transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>درحال ورود...</span>
              </div>
            ) : (
              "ورود"
            )}
          </button>
        </div>

        <div className="space-y-2">
          <p className="border-t border-gray-300 pt-4 sm:pt-6 text-center sm:text-right">
            حساب کاربری ندارید ؟{" "}
            <Link
              href={"/register"}
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300"
            >
              ثبت نام کنید
            </Link>
          </p>

          <Link
            href={"/forgot-password"}
            className="text-sm text-primary hover:text-primary-hover transition-colors duration-300"
          >
            رمز عبور خود را فراموش کره اید ؟
          </Link>
        </div>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>درحال بارگزاری صفحه...</div>}>
      <LoginForm />
    </Suspense>
  );
}
