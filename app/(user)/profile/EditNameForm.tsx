// \app\(user)\profile\EditNameForm.tsx

"use client";

import { useState } from "react";
import { appError } from "@/lib/logError";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/lib/types";
import Input from "@/components/ui/Input";


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
    <div className="bg-surface shadow-sm border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-text-main mb-8">ویرایش نام</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Input 
        label="نام و نام خانوادگی"
        type="text"
        id="name"
        error={error}
        value={name}
        onChange={(e) => setName(e.target.value)}        
        />              

        {success && <p className="text-sm text-success">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-hover disabled:bg-primary-disabled disabled:cursor-not-allowed px-6 py-3 text-surface rounded-lg transition-colors duration-300"
        >
          {loading ? "درحال ذخیره..." : "ذخیره"}
        </button>
      </form>
    </div>
  );
}
