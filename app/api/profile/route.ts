// \app\api\profile\route.ts

import { getUserFromToken } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";
import type { PublicUser } from "@/lib/types";
import { appError } from "@/lib/logError";


export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getUserFromToken();

    if (!currentUser) {
      return NextResponse.json(
        { error: "کاربر وجود ندارد یا وارد نشده است." },
        { status: 401 },
      );
    }

    const { name } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: "نام کاربر الزامیست" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();

    if(trimmedName.length < 3 || trimmedName.length > 100){
        return NextResponse.json(
        { error: "نام کاربر باید از 3 تا 100 کاراکتر باشد" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `
        UPDATE users
        SET name = $1
        WHERE id = $2
        RETURNING id, name, email, created_at;    
    `,
      [trimmedName, currentUser.id],
    );
    
    const updatedUser = result.rows[0] as PublicUser | undefined;

    if(!updatedUser){
      return NextResponse.json(
        {error: "خطایی در بروزرسانی پروفایل رخ داده"},
        {status: 500},
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "نام کاربر ویرایش شد",
        data: updatedUser,
      },
      { status: 200 },
    );
  } catch (error) {
    appError(error, "Profile PUT");
    return NextResponse.json({ error: "خطای در بروزرسانی پروفایل رخ داده" }, { status: 500 });
  }
}
