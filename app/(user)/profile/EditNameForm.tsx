// \app\(user)\profile\EditNameForm.tsx

"use client";

import { useState } from "react";
import { appError } from "@/lib/logError";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/lib/types";


interface EditFormProps {
  currentName: string;
}

export default function EditNameForm({ currentName }: EditFormProps) {
  // مخزن نگهداری نام
  const [name, setName] = useState(currentName);

  // مخزن نگهداری خطا و لودینگ
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // تعریف روتر برای رفرش
  const router = useRouter();

  /**تابع ویرایش اطلاعات */
  async function handleSubmit(e: React.FormEvent) {
    // جلوگیری از رفرش فرم
    e.preventDefault();

    // تنظیم مخزن ها به حالت پیشفرض
    setError("");
    setSuccess("");

    // تنظیم حالت لودینگ
    setLoading(true);

    // صدور خطا درصورت عدم ورود نام
    if (!name.trim()) {
      setError("نام کاربر الزامیست");
      setLoading(false);
      return;
    }

    try {
      // درخواست به سرور برای ویرایش نام
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      // دریافت اطلاعات از سرور
      const data: ApiResponse = await response.json();

      // نمایش خطای مناسب درصورتی که عملیات ناموفق باشد
      if (!response.ok) {
        setError(data.error || "نام کاربر ویرایش نشد");        
        return;
      }

      setSuccess(data.message || "نام کاربر ویرایش شد");

      router.refresh();
     
    } catch (error) {
      setError("خطایی رخ داده لطفا دوباره تلاش کنید");
      appError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">ویرایش نام</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullname" className="block mb-2 text-gray-700">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="fullname"
            value={name}
            minLength={3}
            maxLength={100}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed px-6 py-3 text-white rounded-lg transition-colors duration-300"
        >
          {loading ? "درحال ذخیره..." : "ذخیره"}
        </button>
      </form>
    </div>
  );
}
