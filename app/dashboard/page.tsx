// \app\dashboard\page.tsx

import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import { resolve } from "path";




export default async function DashboardPage() {
  // دریافط اطلاعات کاربر
  const user = await getUserFromToken();  

  
  // هدایت به صفحه لاگین اگر اطلاعات کاربر وجود نداشت
  if (!user) {
    redirect("/login");
  } 

  // نمایش صفحه داشبورد
  return (
    <main className="min-h-screen bg-background md:p-0">
      <div className="hidden md:block">
        <Header />
      </div>

      <div className="md:hidden">
        <MobileMenu role={user.role}/>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-main">داشبورد</h1>
        </div>

        <div className="bg-surface rounded-lg shadow-sm border border-border p-6">
                    
          <h2 className="text-xl font-semibold text-text-main">
            خوش آمدید {user.name}
          </h2>
          <p className="mt-2 text-gray-600">
            نقش: {user.role === 'ADMIN' ? "مدیر" : "کاربر"}
          </p>
          <p className="text-gray-600">آدرس ایمیل: {user.email}</p>
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
