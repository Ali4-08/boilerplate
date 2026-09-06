// \lib\auth.ts

import pool from "./db";
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import type { PublicUser } from "./types";
import { appError } from "@/lib/logError";

/**دریافت اطلاعات کاربر */
export async function getUserFromToken(): Promise<PublicUser | null> {
    
    // دریافت توکن
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    // اگر توکن وجود نداشت null برمی گرداند
    if(!token){
        return null;
    }

    try {
        // بررسی سالم بودم توکن
        const payload = await verifyToken(token);

        // گرفتن اطلاعات کاربر از دیتابیس
        const result = await pool.query(`
            SELECT id, name, email, created_at
            FROM users
            WHERE id = $1;    
        `, [payload.userId]);
        const user = result.rows[0] as PublicUser | undefined;

        // اگر کاربر وجود نداشته باشد null برمیگرداند
        if(!user){
            return null;
        }

        return user;
    } catch (error) {
        // نمایش پیغام خطا های مناسب
        appError(error);
        return null
    }
}