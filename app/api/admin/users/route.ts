// \app\api\admin\users\route.ts

import { NextResponse } from "next/server";
import { appError } from "@/lib/logError";
import { getUserFromToken } from "@/lib/auth";
import type { PublicUser } from "@/lib/types";
import pool from "@/lib/db";

/**
 * بدست آوردن لیست تمام کاربران فقط برای ادمین
 */
export async function GET(){
    try {

        // کاربر جاری که لاگین کرده
        const currentUser = await getUserFromToken();

        // کاربر لاگین نکرده
        if(!currentUser){
            return NextResponse.json(
            {error: "لطفا ابتدا وارد شوید"},
            {status: 401},
        );
        }

        // اگر کاربر لاگین کرده ادمین نباشه
        if(currentUser.role !== "ADMIN"){
            return NextResponse.json(
            {error: "شما دسترسی به این بخش ندارید"},
            {status: 403},
        );
        }

        // لیست کاربران
        const result = await pool.query(`
        SELECT id, name, email, role, created_at
        FROM users
        ORDER BY created_at DESC;    
        `);
        const users = result.rows as PublicUser[];

        // برگرداندن پاسخ
        return NextResponse.json(
            {success: true, message: "عملیات موفق", data: users},
            {status: 200},
        );
    } catch (error) {
        appError(error, "Admin GET /users");
        return NextResponse.json(
            {error: "خطای سرور"},
            {status: 500},
        );
    }
}