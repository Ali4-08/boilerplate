import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { appError } from "@/lib/logError";

export async function POST(request: NextRequest){
    try {
        const {password, token} = await request.json();

        if(!token || !password){
            return NextResponse.json(
                {error: "رمز عبور و توکن الزامیست"},
                {status: 400},
            );
        }

        if(password.length < 8){
            return NextResponse.json(
                {error: "رمز عبور باید حداقل 8 کاراکتر باشد"},
                {status: 400},
            );
        }

        const tokenResult = await pool.query(`
        SELECT user_id, expires_at
        FROM password_reset_tokens
        WHERE token = $1 AND used = false;    
        `, [token]);

        const tokenData = tokenResult.rows[0];

        if(!tokenData){
            return NextResponse.json(
                {error: "لینک بازیابی خراب است یا استفاده شده."},
                {status: 400},
            );
        }

        const now = new Date();
        const expires_at = new Date(tokenData.expires_at);

        if(now > expires_at){
            return NextResponse.json(
                {error: "لینک بازیابی منقضی شده است لطفا دوباره درخواست دهید."},
                {status: 400},
            );
        }

        const client = await pool.connect();

        try {
            await client.query("BEGIN");
            
            const hashPassword = await bcrypt.hash(password, 10);

            await client.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hashPassword, tokenData.user_id]);

            await client.query("UPDATE password_reset_tokens SET used = true WHERE id = $1", [tokenData.user_id]);

            await client.query("COMMIT");
            
        } catch (error) {
            await client.query("ROLLBACK");
            throw error
        } finally {
            client.release();
        }

        return NextResponse.json(
            {
                success: true,
                message: "رمز عبور با موفقیت تغییر کردT اکنون می توانید وارد شوید."
            },
            {status: 200},
        );

    } catch (error) {
        appError(error, "ResetPassword POST");
        return NextResponse.json(
            {error: "خطای سرور"},
            {status: 500},
        );
    }
}