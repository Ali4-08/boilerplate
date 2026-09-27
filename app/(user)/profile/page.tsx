// \app\(user)\profile\page.tsx

import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";
import EditNameForm from "./EditNameForm";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";

export default async function ProfilePage() {
  // گرفتن کاربر لاگین شده
  const user = await getUserFromToken();

  // اگر کاربر نبود ریدایرکت میشه به لاگین
  if (!user) {
    redirect("/login");
  }
  

  return (
    <main className="bg-background min-h-screen p-4 md:p-0">

      <div className="hidden md:block">
        <Header />
      </div>

      <div className="md:hidden">
        <MobileMenu role={user.role}/>
      </div>

      <div className="max-w-4xl mx-auto md:p-6">

        <h1 className="text-3xl font-bold text-text-main mb-8 mt-4">پروفایل من</h1>

        <div className="space-y-2 mb-4 shadow-sm p-4 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            اطلاعات حساب
          </h2>
          <p className="text-gray-700">نام: {user.name}</p>
          <p className="text-gray-700">ایمیل: {user.email}</p>
          <p className="text-gray-700">نقش: {user.role === "USER" ? "کاربر" : "مدیر"}</p>
          <p className="text-gray-700">
            تاریخ عضویت:{" "}
            {new Date(user.created_at).toLocaleDateString("fa-IR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        <EditNameForm currentName={user.name} />
      </div>
    </main>
  );
}
