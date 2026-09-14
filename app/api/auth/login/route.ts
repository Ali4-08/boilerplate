// \app\api\auth\login\route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import type { LoginData } from "@/lib/types";
import { createToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){    
   
    // دریافت اطلاعات از کاربر
    const {email, password} = await request.json();

    // بررسی اعتبار ورودی کاربر
    if(!email || !password){
        return NextResponse.json(
            {error: "ایمیل و رمز عبور را وارد کنید."},
            {status: 400},
        );
    }    
    
    // دریافت اطلاعات از پایگاه داده
    const result = await pool.query(`
        SELECT id, name, email, password_hash, role, created_at
        FROM users
        WHERE email=$1;
    `, [email]);
    const user = result.rows[0] as LoginData | undefined;

    // نمایش پیام مناسب درصورتی که کاربر پیدا نشود
    if(!user){
        return NextResponse.json(
            {error: "ایمیل یا رمز عبور اشتباه است."},
            {status: 401},
        );
    }
    
    // مقایسه پسورد ورودی با ثبت شده
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    // نمایش پیغام مناسب درصورت ورود پسورد اشتباه
    if(!isPasswordValid){
         return NextResponse.json(
            {error: "ایمیل یا رمز عبور اشتباه است."},
            {status: 401},
        );
    }

    // ساخت توکن
    const token = await createToken(user.id, user.email, user.role);

    // ارسال اطلاعات به فرم لاگین
    const response = NextResponse.json(
        {
            success: true,
            message: "ورود موفق.",
            data: user,
        },
        {status: 200},
    );

    // ذخیره اطلاعات در کوکی
    response.cookies.set('auth-token', token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return response;

}