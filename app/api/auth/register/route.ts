// \app\api\auth\register\route.ts

import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";
import { ErrorType, User } from "@/lib/types";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
  try {

    // درسافت اطلاعات از کاربر
    const {name, email, password} = await request.json();

    // بررسی و اعتبار سنجی اطلاعات ورودی
  if(!name || !email || !password) {
    return NextResponse.json(
      {error: "همه اطلاعات الزامیست."},
      {status: 400},
    );
  }

  // رمزنگاری پسورد
  const hashPassword = await bcrypt.hash(password, 10);

  // ثبت اطلاعات ورودی در پایگاه داده
  const result = await pool.query(`
    INSERT INTO users(name, email, password_hash)
    VALUES($1, $2, $3)
    RETURNING id, name, email, created_at;
    `, [name, email, hashPassword]);
    const user = result.rows[0] as User;

    // ارسال پیام مناسب بعد از ثبت به فرم ثبت نام
    return NextResponse.json(
      {
        success: true, 
        message: "کاربر ثبت شد.", 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          create_at: user.created_at,
        }
      },
      {status: 201},
    );

  } catch (err) {

    // نمایش پیغام خطای مناسب  هنگام بروز خطا
    const error = err as ErrorType;
    if(error.code === '23505'){
      return NextResponse.json(
        {error: "این ایمیل قبلا ثبت شده است"},
        {status: 409},
      );
    } else {
      return NextResponse.json(
        {error: `خطای سرور: ${error.message}`},
        {status: 500},
      );
    }
    
  }

  
}