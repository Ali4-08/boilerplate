// \app\(admin)\admin\page.tsx

import pool from "@/lib/db";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";
import { Users, Shield, UserStar, Edit } from "lucide-react";
import type { PublicUser } from "@/lib/types";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import ChangeRoleButton from "@/components/admin/ChangeRolButton";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Card from "@/components/admin/Card";


export default async function AdminDashboardPage() {
  // گرفتن کاربر جاری
  const user = await getUserFromToken();

  // بررسی نقش کاربر
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
  

  // *************************************** آمار داشبورد

  // تعداد کاربران
  const totalUsersResult = await pool.query(`
    SELECT COUNT(*) AS count 
    FROM users;    
    `);
  const totalUsers = Number(totalUsersResult.rows[0].count) || 0;

  // تعداد ادمین ها
  const totalAdminsResult = await pool.query(`
    SELECT COUNT(*) AS count 
    FROM users 
    WHERE role = 'ADMIN';
    `);
  const totalAdmins = Number(totalAdminsResult.rows[0].count) || 0;

  // تعداد کاربران 7 روز اخیر
  const newUsersResult = await pool.query(`
    SELECT COUNT(*) AS count
    FROM users
    WHERE created_at > NOW() - INTERVAL '7 days';
    `);
  const newUsers = Number(newUsersResult.rows[0].count) || 0;

  // *************************************** لیست کاربران

  const usersResult = await pool.query(`
    SELECT id, name, email, role, created_at
    FROM users
    ORDER BY created_at DESC;    
    `);
  const users = usersResult.rows as PublicUser[];

  return (
    <>
    <div className="hidden lg:block">
      <Header />
    </div>
    
    <div className="block lg:hidden">
      <MobileMenu role={user.role} />
    </div>

      <main className="bg-background min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* عنوان */}
        <h1 className="text-3xl font-bold text-text-main mb-8">
          پنل مدیر
        </h1>

        {/* کارت های آماری */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* کارت اول تعداد کاران */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm">تعداد کاربران</p>
                <p className="text-3xl font-bold text-text-main mt-1">
                  {totalUsers}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users size={22} className="text-primary" />
              </div>
            </div>
          </Card>

          {/* کارت دوم تعداد مدیران */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">تعداد مدیران</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {totalAdmins}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Shield size={22} className="text-purple-700" />
              </div>
            </div>
          </Card>

          {/* کارت سوم کاربران جدید */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">تعداد کاربران جدید</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {newUsers}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <UserStar size={22} className="text-green-700" />
              </div>
            </div>
          </Card>
        </div>

        {/* لیست کاربران */}
        <div className="border border-border bg-surface shadow-sm rounded-lg overflow-hidden">
          
          {/* عنوان جدول */}
          <div className="border-b border-border p-6">
            <h2 className="text-3xl font-semibold text-text-main">
              لیست کاربران {users.length}
            </h2>
          </div>

          {/* جدول کاربران */}
          <div className="overflow-auto">
            <table className="w-full">
             
              {/* عنوان ستون ها */}
              <thead className="bg-background border-border border-b">
                <tr>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    ردیف
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    نام
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    ایمیل
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    نقش
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    تاریخ عضویت
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">
                    عملیات
                  </th>
                </tr>
              </thead>

              {/* سطر های جدول */}
              <tbody>
                {users.map((userItem, index) => (
                  <tr
                    key={userItem.id}
                    className="hover:bg-gray-100 transition-colors border-b last:border-b-0 border-border"
                  >
                    <td className="text-gray-700 px-6 py-3">{index + 1}</td>
                    <td className="text-gray-700 px-6 py-3">{userItem.name}</td>
                    <td className="text-gray-700 px-6 py-3">{userItem.email}</td>

                    <td className="px-6 py-3">
                      {userItem.role === "ADMIN" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-purple-100 bg-purple-800 rounded-full ">
                          <Shield size={18} />
                          مدیر
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-blue-100 bg-blue-800 rounded-full px-2.5 py-1 text-xs font-medium">
                          <Users size={18} />
                          کاربر
                        </span>
                      )}
                    </td>

                    <td className="text-gray-700 px-6 py-3">
                      {new Date(userItem.created_at).toLocaleDateString("fa-IR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="text-gray-700 px-6 py-3 flex items-center gap-2">
                      <ChangeRoleButton 
                      userId={userItem.id}
                      currentUserId={user.id}
                      username={userItem.name}
                      userRole={userItem.role}/>

                      <DeleteUserButton 
                      userId={userItem.id} 
                      currentUserId={user.id}
                      username={userItem.name}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
