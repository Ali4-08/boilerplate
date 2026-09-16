// \app\(admin)\admin\page.tsx

import pool from "@/lib/db";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";
import { Users, Shield, UserStar } from "lucide-react";


export default async function AdminDashboardPage(){
    const user = await getUserFromToken();

    if(!user || user.role !== 'ADMIN'){
        redirect("/login");
    }

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

    return(
        <main className="bg-gray-50 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                
                {/* عنوان */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Admin Dashboard
                </h1>
                
                {/* کارت های آماری */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* کارت اول تعداد کاران */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">تعداد کاربران</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{totalUsers}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Users size={22} className="text-blue-700"/>
                            </div>
                        </div>
                    </div>

                    {/* کارت دوم تعداد مدیران */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">تعداد مدیران</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{totalAdmins}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Shield size={22} className="text-purple-700"/>
                            </div>
                        </div>
                    </div>

                    {/* کارت سوم کاربران جدید */}
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">تعداد کاربران جدید</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{newUsers}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <UserStar size={22} className="text-green-700"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}