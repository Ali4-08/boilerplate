// \app\api\auth\logout\route.ts

import { NextResponse } from "next/server";
import { appError } from "@/lib/logError";
import { cookies } from "next/headers";

export async function POST(){
    try {
        const cookieStore = await cookies();

        cookieStore.delete("auth-token");

        return NextResponse.json(
            {success: true, message: "خروج با موفقیت انجام شد"},
            {status: 200},
        );
    } catch (error) {
        appError(error, "Logout POST");
        return NextResponse.json(
            {error: "خطا در خروج از حساب کاربری"},
            {status: 500},
        );
    }
}