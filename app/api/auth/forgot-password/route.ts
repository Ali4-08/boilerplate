import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import pool from "@/lib/db";
import { appError } from "@/lib/logError";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          success: true,
          message:
            "اگر ایمیل ثبت شده باشد یک لینک بازیابی برایش ارسال خواهد شد.",
        },
        { status: 200 },
      );
    }

    const result = await pool.query(
      `
            SELECT id FROM users
            WHERE email = $1;    
        `,
      [email],
    );
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message:
            "اگر ایمیل ثبت شده باشد یک لینک بازیابی برایش ارسال خواهد شد.",
        },
        { status: 200 },
      );
    }

    await pool.query(
      `
            UPDATE password_reset_tokens
            SET token = true
            WHERE user_id = $1 AND used = false;
        `,
      [user.id],
    );

    const token = crypto.randomBytes(32).toString("hex");

    await pool.query(
      `
            INSERT INTO password_reset_tokens(user_id, token, expires_at)
            VALUES($1, $2, NOW() + INTERVAL '1 hour');
        `,
      [user.id, token],
    );

    return NextResponse.json(
      {
        success: true,
        message: "اگر ایمیل ثبت شده باشد یک لینک بازیابی برایش ارسال خواهد شد.",
      },
      { status: 200 },
    );
  } catch (error) {
    appError(error, "Forgot Password POST");
    return NextResponse.json({ error: "خطای سرور رخ داده" }, { status: 500 });
  }
}
