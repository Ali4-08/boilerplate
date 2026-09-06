// \app\profile\page.tsx

import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";
import EditNameForm from "./EditNameForm";

export default async function ProfilePage() {
  // گرفتن کاربر لاگین شده
  const user = await getUserFromToken();

  // اگر کاربر نبود ریدایرکت میشه به لاگین
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="bg-gray-50 min-h-screen p-6 lg:p-8">
      <div className="max-w-2xl mx-auto ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">پروفایل من</h1>

        <div className="space-y-2 mb-4 shadow-sm p-4 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            اطلاعات حساب
          </h2>
          <p className="text-gray-700">نام: {user.name}</p>
          <p className="text-gray-700">ایمیل: {user.email}</p>
          <p className="text-gray-700">
            تاریخ عضویت:{" "}
            {new Date(user.created_at).toLocaleDateString("fa-IR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }) || "نا مشخص"}
          </p>
        </div>

        <EditNameForm currentName={user.name} />
      </div>
    </main>
  );
}
