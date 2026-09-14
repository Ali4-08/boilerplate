// \app\api\auth\register\route.ts

import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";
import { ApiResponse, PublicUser } from "@/lib/types";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";


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
    INSERT INTO users(name, email, password_hash, role)
    VALUES($1, $2, $3, 'USER')
    RETURNING id, name, email, role, created_at;
    `, [name, email, hashPassword]);
    const user = result.rows[0] as PublicUser | undefined;

    // ارسال ایمیل خوش آمدگویی
    sendWelcomeEmail(email, name).then(result => {
      if(!result.success){
        console.error("Welcome email is faild.", result.error);
      }
    }).catch(err => {
      console.error("Welcome email error", err);
    });
    

    // ارسال پیام مناسب بعد از ثبت به فرم ثبت نام
    return NextResponse.json(
      {
        success: true, 
        message: "کاربر ثبت شد.", 
        data: user,
      },
      {status: 201},
    );

  } catch (err) {

    // نمایش پیغام خطای مناسب  هنگام بروز خطا
    const error = err as ApiResponse;
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