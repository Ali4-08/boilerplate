// scripts/create-admin.ts

/**
 * اسکریپت ساخت اولین کاربر ادمین
 * 
 * نحوه استفاده:
 * 1. در فایل .env.local این مقادیر را تعریف کنید:
 *    ADMIN_EMAIL=admin@example.com
 *    ADMIN_PASSWORD=YourStrongPassword123
 *    ADMIN_NAME=مدیر سیستم
 * 
 * 2. این دستور را اجرا کنید:
 *    npm run create-admin
 */

import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
import bcrypt from "bcryptjs";

const adminName = process.env.ADMIN_NAME || "Admin";
const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;

// ═══  اعتبارسنجی مقادیر ═══
if (!adminEmail || !adminPassword) {
    console.error("");
    console.error("❌ Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env.local file.");
    console.error("");
    console.error("📝 Example:");
    console.error("   ADMIN_EMAIL=admin@example.com");
    console.error("   ADMIN_PASSWORD=YourStrongPassword123");
    console.error("   ADMIN_NAME=Admin (optional)");
    console.error("");
    process.exit(1);
}

// اعتبارسنجی فرمت ایمیل
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(adminEmail)) {
    console.error(`❌ Error: Invalid email format "${adminEmail}".`);
    process.exit(1);
}

// اعتبارسنجی طول رمز عبور
if (adminPassword.length < 8) {
    console.error("❌ Error: Password must be at least 8 characters long.");
    process.exit(1);
}


async function createAdmin() {
    const { default: pool } = await import("../lib/db");

  try {
    console.log("🔄 Creating admin account...");    

    const existing = await pool.query(
      `
        SELECT id FROM users
        WHERE email = $1;
    `,
      [adminEmail],
    );

    if (existing.rows.length > 0) {
      console.error(`❌ Email ${adminEmail} is already registered.`);
      process.exit(1);
    }

     // هش کردن رمز عبور
        console.log("🔐 Hashing password...");
    const passwordHash = await bcrypt.hash(adminPassword!, 10);

     // ذخیره در دیتابیس
        console.log("💾 Saving to database...");
    const result = await pool.query(
      `
    INSERT INTO users(name, email, role, password_hash)
    VALUES($1, $2, 'ADMIN', $3)
    RETURNING id, name, email, role, created_at;
    `,
      [adminName, adminEmail, passwordHash],
    );

    if (result.rows.length === 0) {
      console.error("❌ Admin user was not created.");
      process.exit(1);
    }

    const admin = result.rows[0];

     // نمایش پیام موفقیت
        console.log("");
        console.log("╔════════════════════════════════════════╗");
        console.log("║  ✅ Admin account created successfully ║");
        console.log("╚════════════════════════════════════════╝");
        console.log("");
        console.log("📋 Account details:");
        console.log(`   👤 Name:        ${admin.name}`);
        console.log(`   📧 Email:       ${admin.email}`);
        console.log(`   🎭 Role:        ${admin.role}`);
        console.log(`   🆔 ID:          ${admin.id}`);
        console.log(`   📅 Created at:  ${new Date(admin.created_at).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })}`);
        console.log("");
        console.log("🎉 You can now login with these credentials.");
        console.log("");

        // بستن اتصال دیتابیس
        await pool.end();
        process.exit(0);

  } catch (error) {
    console.error("");
        console.error("❌ Error creating admin account:");
        console.error(error);
        console.error("");

        // بستن اتصال در صورت خطا
        try {
            await pool.end();
        } catch {
            
        }
        process.exit(1);
  } 
}

// اجرای تابع
createAdmin();
