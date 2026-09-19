// app\api\admin\users\[id]\route.ts

import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import { appError } from "@/lib/logError";

/**
 * تابع حذف کاربر
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // دریافت شناسه کاربر
    const { id } = await params;
    const userId = parseInt(id);

    // اعتبار سنجی شناسه کاربر
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "شناسه کاربر نامعتبر است" },
        { status: 400 },
      );
    }

    // اعتبار سنجی کاربر
    const currentUser = await getUserFromToken();
    if (!currentUser) {
      return NextResponse.json({ error: "ابتدا وارد شوید" }, { status: 401 });
    }

    // بررسی نقش کاربر
    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "شما به این بخش دسترسی ندارید" },
        { status: 403 },
      );
    }

    // جلوگیری از حذف مدیر توسط خودش
    if (currentUser.id === userId) {
      return NextResponse.json(
        { error: "شما نمی توانید حساب خود را حذف کنید" },
        { status: 400 },
      );
    }

    // حذف کاربر
    const result = await pool.query(
      `
        DELETE FROM users WHERE id = $1;
        `,
      [userId],
    );

    // بررسی نتیجه حذف کاربر
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "کاربر مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    // ارسال پیام موفقیت
    return NextResponse.json(
      { success: true, message: "کاربر با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (error) {
    appError(error, "DELETE api/admin/users/[id]");
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}

/**
 * تابع ویراش نقش کاربر
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // درسافت شناسه کاربر
    const { id } = await params;
    const userId = parseInt(id);

    // بررسی شناسه کاربر
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "شناسه کاربر معتبر نمی باشد" },
        { status: 400 },
      );
    }

    // دریافت نقش کاربر
    const { userRole } = await request.json();
    const validRoles = ["ADMIN", "USER"];

    // بررسی نقش کاربر
    if (!userRole || !validRoles.includes(userRole)) {
      return NextResponse.json(
        { error: "نقش کاربر معتبر نمی باشد" },
        { status: 400 },
      );
    }

    // احراز هویت کاربر جاری
    const currentUser = await getUserFromToken();

    // ارسال پیام درصورت وارد نشدن کاربر
    if (!currentUser) {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد شوید" },
        { status: 401 },
      );
    }

    // بررسی نقش کاربر. فقط ادمین مجاز است
    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { error: "شما دسترسی به این بخش ندارید" },
        { status: 403 },
      );
    }

    // جلوگیری از تغییر نقشی ادمین توسط خودش
    if (userId === currentUser.id) {
      return NextResponse.json(
        { error: "شما نمی توانید نقش خود را تغییر دهید" },
        { status: 400 },
      );
    }

    // تغییر نقش کاربر قبل از ویرایش جدول
    const newRole = userRole === "USER" ? "ADMIN" : "USER";
    
    // ویرایش نقش در جدول
    const result = await pool.query(
      `
UPDATE users
SET role = $1
WHERE id = $2  
`,
      [newRole, userId],
    );

    // ارسال پیام درصورت عدم وجود کاربر
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "کاربر مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    // ارسال پیام موفق
    return NextResponse.json(
      {
        success: true,
        message: "نقش کاربر با موفقیت تغییر کرد",
      },
      { status: 200 },
    );
  } catch (error) {
    appError(error, "PUT api/admin/users/[id]");
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
