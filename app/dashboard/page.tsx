// \app\dashboard\page.tsx

import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  // دریافط اطلاعات کاربر
  const user = await getUserFromToken();

  // هدایت به صفحه لاگین اگر اطلاعات کاربر وجود نداشت
  if (!user) {
    redirect("/login");
  }

  // نمایش صفحه داشبورد
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">داشبورد</h1>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            خوش آمدید {user.name}
          </h2>
          <p className="mt-2 text-gray-600">آدرس ایمیل: {user.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            تاریخ عضویت:{" "}
            {new Date(user.created_at).toLocaleDateString("fa-IR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }) || "نا مشخص"}
          </p>
        </div>
      </div>
    </main>
  );
}
