import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import pool from "@/lib/db";
import { appError } from "@/lib/logError";
import { sendPasswordResetEmail } from "@/lib/email";


export async function POST(request: NextRequest) {
  try {

    // دریافت ایمیل از کاربر
    const { email } = await request.json();

    // پیغام موفقیت برای همه حالت ها
    const successMessage = "اگر ایمیل ثبت شده باشد یک لینک بازیابی برایش ارسال خواهد شد.";

    // اعتبار سنجی ساده
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: true,
          message: successMessage,
        },
        { status: 200 },
      );
    }

    // بررسی وجود کاربر
    const result = await pool.query(
      `
            SELECT id FROM users
            WHERE email = $1;    
        `,
      [email],
    );
    const user = result.rows[0];

    // ارسال پیام در صورت عدم وجود کاربر
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: successMessage,
        },
        { status: 200 },
      );
    }

    // باطل کردن توکن های قبلی
    await pool.query(
      `
            UPDATE password_reset_tokens
            SET token = true
            WHERE user_id = $1 AND used = false;
        `,
      [user.id],
    );

    // ایجاد توکن جدید
    const token = crypto.randomBytes(32).toString("hex");

    // ذخیره توکن
    await pool.query(
      `
            INSERT INTO password_reset_tokens(user_id, token, expires_at)
            VALUES($1, $2, NOW() + INTERVAL '1 hour');
        `,
      [user.id, token],
    );

    // ساخت لینک بازیابی
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
    
    // ارسال ایمیل
    const emailResult = await sendPasswordResetEmail(email, resetLink);

     // لاگ برای دیباگ (فقط در development)
        if (process.env.NODE_ENV === "development") {
            console.log("\n═══════════════════════════════════════");
            console.log("🔐 PASSWORD RESET LINK:");
            console.log(resetLink);
            console.log("═══════════════════════════════════════\n");
        }

        // نمایش خطا درصورت عدم ارسال ایمیل
        if(!emailResult.success){
          console.error("Faild to send reset email.", emailResult.error)
        }



    return NextResponse.json(
      {
        success: true,
        message: successMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    appError(error, "Forgot Password POST");
    return NextResponse.json({ error: "خطای سرور رخ داده" }, { status: 500 });
  }
}
