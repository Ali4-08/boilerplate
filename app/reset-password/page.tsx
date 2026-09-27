// \app\reset-password\page.tsx

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { KeyRound } from "lucide-react";
import { ApiResponse } from "@/lib/types";
import Input from "@/components/ui/Input";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  // اعتبار سنجی توکن
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold text-gray-900">
          لینک بازیابی نامعتبر است
        </h1>
        <p className="text-lg font-medium text-gray-600">
          لطفا دوباره درخاست بازیابی رمز بدهید
        </p>
      </div>
    );
  }

  // بررسی توکن و رمز عبور و تغییر رمز عبور
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("رمز عبور باید حداقل 8 کاراکتر باشد");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور با تکرار رمز عبور مطابقت ندارد");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        router.push("/login?reset=success");
      } else {
        setError(data.error || "خطایی رخ داده");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border w-full max-w-md rounded-lg border-border shadow-sm p-4">
        {/* عنوان فرم */}
        <h2 className="flex items-center gap-2 border-b border-gray-300 pb-4 mb-5">
          <KeyRound size={22} className="text-yellow-500 fill-yellow-200" />
          <span className="text-xl font-semibold text-gray-700">
            بازیابی رمز عبور
          </span>
        </h2>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* رمز عبور */}
          <Input
            label="رمز عبور"
            id="password"
            type="password"
            minLength={8}
            value={password}
            error={error}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* تکرار رمز عبور */}
          <Input
            label="تکرار رمز عبور"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            minLength={8}
            error={error}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* پیغام خطا در صورت وجود */}
          {error && <p className="text-lg text-danger">{error}</p>}

          {/* دکمه ها */}
          <div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white rounded-md px-8 py-3 transition-colors duration-300"
            >
              {loading ? "درحال ثبت..." : "ثبت"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>درحال بارگزاری اطلاعات...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
