// \app\dashboard\page.tsx

import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";

export default async function DashboardPage() {
  // دریافط اطلاعات کاربر
  const user = await getUserFromToken();

  // هدایت به صفحه لاگین اگر اطلاعات کاربر وجود نداشت
  if (!user) {
    redirect("/login");
  }

  // نمایش صفحه داشبورد
  return (
    <main className="min-h-screen bg-gray-50 md:p-0">
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="md:hidden">
        <MobileMenu />
      </div>

      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">داشبورد</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
