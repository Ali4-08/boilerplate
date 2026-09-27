
```markdown
<div dir="rtl" style="text-align: right;">

# 🚀 Nextjs Boilerplate

> یک بویلرپلیت کامل و آمادهٔ تولید برای ساخت اپلیکیشن های وب مدرن با **Next.js 15**، **PostgreSQL** و **سیستم احراز هویت کامل** - رایگان و متن باز! ✨

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📖 دربارهٔ پروژه

اگر از ساختن مکرر سیستم های احراز هویت، پنل مدیریت و ساختارهای پایه خسته شده‌اید، این پروژه برای شماست! 🎯

**Next.js Boilerplate** یک بویلرپلیت کامل است که شامل تمام چیزهایی است که برای شروع یک پروژهٔ وب حرفه‌ای نیاز دارید: از احراز هویت کامل با بازیابی رمز عبور گرفته تا پنل مدیریت با کنترل دسترسی نقش محور.

### 🎯 این پروژه برای چه کسانی مناسب است؟

- 👨‍💻 توسعه دهندگانی که می خواهند سریع شروع کنند
- 🎓 دانشجویانی که می خواهند یک پروژهٔ کامل را یاد بگیرند
- 🏢 تیم هایی که به یک پایهٔ استاندارد نیاز دارند
- 🚀 استارتاپ‌ هایی که می‌خواهند سریع به بازار برسند

---

## ✨ ویژگی‌ ها

### 🔐 احراز هویت کامل
- ✅ ثبت‌ نام با هش کردن پسورد (`bcryptjs`)
- ✅ ورود با JWT در `HttpOnly Cookie`
- ✅ خروج امن با پاک‌سازی کوکی
- ✅ بازیابی رمز عبور از طریق ایمیل
- ✅ توکن‌ های امن ۲۵۶ بیتی با انقضای ۱ ساعته
- ✅ جلوگیری از حملات Email Enumeration

### 👥 نقش‌های کاربری (RBAC)
- ✅ نقش `USER`: دسترسی عادی به داشبورد و پروفایل
- ✅ نقش `ADMIN`: دسترسی کامل به پنل مدیریت
- ✅ محافظت سه‌ لایه: `Middleware` + `Server Component` + `API Route`

### 👨‍💼 پنل مدیریت
- ✅ مشاهدهٔ لیست کاربران با آمار زنده
- ✅ حذف کاربر (با جلوگیری از حذف خود)
- ✅ تغییر نقش کاربر (با اعتبارسنجی)
- ✅ محافظت کامل با Middleware

### 🎨 رابط کاربری مدرن
- ✅ طراحی با **Tailwind CSS v4.3**
- ✅ فونت فارسی **وزیرمتن** (لوکال)
- ✅ کامپوننت‌ های قابل استفادهٔ مجدد (`Input`, `Skeleton`, `Card`)
- ✅ حالت‌ های `Loading`, `Error`, `404` برای هر صفحه
- ✅ منوی واکنش‌ گرا با همبرگر منو

### 📱 ریسپانسیو کامل
- ✅ بهینه برای موبایل، تبلت و دسکتاپ
- ✅ منوی کشویی برای موبایل
- ✅ جدول‌ها با قابلیت اسکرول افقی

### 🗄️ دیتابیس
- ✅ **PostgreSQL** با اتصال `pg`
- ✅ کوئری‌ های پارامتری برای جلوگیری از SQL Injection
- ✅ `ON DELETE CASCADE` برای یکپارچگی داده‌ها

---

## 📸 اسکرین‌شات‌ ها

> 💡 **نکته:** برای مشاهدهٔ تصویر در اندازهٔ کامل، روی آن کلیک کنید.

<table>
  <tr>
    <td align="center">
      <a href="./screenshots/login.png">
        <img src="./screenshots/login.png" alt="صفحه ورود" width="300"/>
      </a>
      <br>
      <sub>صفحهٔ ورود</sub>
    </td>
    <td align="center">
      <a href="./screenshots/dashboard.png">
        <img src="./screenshots/dashboard.png" alt="داشبورد کاربر" width="300"/>
      </a>
      <br>
      <sub>داشبورد کاربر</sub>
    </td>
    <td align="center">
      <a href="./screenshots/admin-panel.png">
        <img src="./screenshots/admin-panel.png" alt="پنل مدیریت" width="300"/>
      </a>
      <br>
      <sub>پنل مدیریت</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="./screenshots/profile.png">
        <img src="./screenshots/profile.png" alt="پروفایل" width="300"/>
      </a>
      <br>
      <sub>پروفایل کاربری</sub>
    </td>
    <td align="center">
      <a href="./screenshots/forgot-password.png">
        <img src="./screenshots/forgot-password.png" alt="بازیابی رمز" width="300"/>
      </a>
      <br>
      <sub>بازیابی رمز عبور</sub>
    </td>
    <td align="center">
      <a href="./screenshots/error.png">
        <img src="./screenshots/error.png" alt="صفحه خطا" width="300"/>
      </a>
      <br>
      <sub>صفحهٔ خطا (404/500)</sub>
    </td>
  </tr>
</table>

---

## 🎥 دمو

> 🔗 **لینک دمو:** [مشاهدهٔ دموی زنده](#) *(بعد از دیپلوی اضافه می‌شود)*


## 🚀 شروع سریع

### پیش‌ نیازها

قبل از شروع، مطمئن شوید این موارد نصب هستند:

- [Node.js](https://nodejs.org) نسخهٔ **18 یا بالاتر**
- [PostgreSQL](https://www.postgresql.org) نسخهٔ **14 یا بالاتر**
- [Git](https://git-scm.com) نسخهٔ **2 یا بالاتر**

### نصب قدم به قدم

#### 1️⃣ کلون کردن پروژه

```bash
git clone https://github.com/Ali4-08/boilerplate.git
cd boilerplate
```

#### 2️⃣ نصب وابستگی‌ ها

```bash
npm install
```

#### 3️⃣ تنظیم متغیرهای محیطی

```bash
# کپی کردن فایل نمونه
cp .env.example .env.local
```

سپس فایل `.env.local` را با مقادیر خودتان ویرایش کنید (بخش [متغیرهای محیطی](#-متغیرهای-محیطی) را ببینید).

#### 4️⃣ ساخت دیتابیس

```sql
-- در PostgreSQL اجرا کنید:
CREATE DATABASE boilerplate_db;
```

سپس فایل `query.sql` را اجرا کنید تا جداول ساخته شوند:

```bash
psql -U postgres -d boilerplate_db -f query.sql
```

#### 5️⃣ ساخت اولین کاربر ادمین

در فایل `.env.local` این مقادیر را تعریف کنید:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourStrongPassword123
ADMIN_NAME=مدیر سیستم
```

سپس اسکریپت را اجرا کنید:

```bash
npm run create-admin
```

این دستور به‌صورت خودکار:
- ✅ یک کاربر جدید با نقش `ADMIN` می‌ سازد
- ✅ رمز عبور را به‌ صورت امن هش می‌ کند
- ✅ بررسی می‌ کند که ایمیل تکراری نباشد
- ✅ اطلاعات کاربر را نمایش می‌ دهد

**خروجی موفق:**

```
🔄 Creating admin account...
🔐 Hashing password...
💾 Saving to database...

╔══════════════════════════════════════╗
║  Admin account created successfully  ║
╚══════════════════════════════════════╝

📋 Account details:
   👤 Name:        مدیر سیستم
   📧 Email:       admin@example.com
   🎭 Role:        ADMIN
   🆔 ID:          1
   📅 Created at:  09/27/2026

🎉 You can now login with these credentials.
```

#### 6️⃣ اجرای پروژه

```bash
npm run dev
```

✅ پروژه در آدرس `http://localhost:3000` در دسترس است.

---

## 🔧 متغیرهای محیطی

فایل `.env.example` را به `.env.local` کپی کنید و مقادیر زیر را تنظیم کنید:

```env
# ─────────────────────────────────────
# دیتابیس
# ─────────────────────────────────────
DATABASE_URL=postgresql://username:password@localhost:5432/boilerplate_db

# ─────────────────────────────────────
# احراز هویت
# ─────────────────────────────────────
# یک رشتهٔ تصادفی حداقل 32 کاراکتری
# برای تولید: openssl rand -base64 32
JWT_SECRET=your-super-secret-key-here

# ─────────────────────────────────────
# ایمیل (اختیاری)
# ─────────────────────────────────────
# از سایت resend.com دریافت کنید
RESEND_API_KEY=re_your_api_key_here

# ─────────────────────────────────────
# مدیر سیستم (برای اسکریپت ساخت ادمین)
# ─────────────────────────────────────
# ایمیل اولین کاربر ادمین
ADMIN_EMAIL=admin@example.com

# رمز عبور قوی (حداقل 8 کاراکتر)
ADMIN_PASSWORD=YourStrongPassword123

# نام نمایشی مدیر (اختیاری)
ADMIN_NAME=مدیر سیستم

# ─────────────────────────────────────
# اپلیکیشن
# ─────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗄️ ساختار دیتابیس

### جدول `users`

| ستون | نوع | توضیح |
|------|-----|-------|
| `id` | SERIAL | شناسهٔ یکتا |
| `name` | VARCHAR(100) | نام کاربر |
| `email` | VARCHAR(255) | ایمیل (یکتا) |
| `password_hash` | VARCHAR(255) | هش پسورد |
| `role` | VARCHAR(20) | نقش کاربر (`USER` یا `ADMIN`) |
| `created_at` | TIMESTAMP | تاریخ عضویت |

### جدول `password_reset_tokens`

| ستون | نوع | توضیح |
|------|-----|-------|
| `id` | SERIAL | شناسهٔ یکتا |
| `user_id` | INTEGER | شناسهٔ کاربر (با `ON DELETE CASCADE`) |
| `token` | VARCHAR(64) | توکن بازیابی |
| `expires_at` | TIMESTAMP | زمان انقضا |
| `used` | BOOLEAN | وضعیت استفاده |
| `created_at` | TIMESTAMP | تاریخ ساخت |

---

## 📁 ساختار پروژه

```
nextjs-boilerplate/
├── app/                          # 📁 صفحات و API‌ها
│   ├── (admin)/                  # 👨‍💼 پنل مدیریت
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── (auth)/                   # 🔐 صفحات احراز هویت
│   │   ├── login/
│   │   └── register/
│   ├── (user)/                   # 👤 صفحات کاربری
│   │   └── profile/
│   ├── api/                      # 🔌 API Routes
│   │   ├── admin/
│   │   │   └── users/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── logout/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   └── user/
│   │       └── profile/
│   ├── dashboard/                # 📊 داشبورد کاربر
│   ├── forgot-password/          # 🔑 فراموشی رمز
│   ├── reset-password/           # 🔄 بازنشانی رمز
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # 🧩 کامپوننت‌ ها
│   ├── admin/                    # کامپوننت‌ های پنل مدیریت
│   ├── ui/                       # کامپوننت‌ های پایه
│   ├── Header.tsx
│   ├── LogoutButton.tsx
│   └── MobileMenu.tsx
├── lib/                          # 🛠️ کتابخانه‌ ها
│   ├── auth.ts                   # احراز هویت
│   ├── db.ts                     # اتصال دیتابیس
│   ├── email.ts                  # ارسال ایمیل
│   ├── jwt.ts                    # توکن‌ ها
│   ├── logError.ts               # لاگ خطاها
│   └── types.ts                  # تایپ‌ ها
├── scripts/                      # 📜 اسکریپت‌ های CLI
│   └── create-admin.ts           # ساخت اولین کاربر ادمین
├── data/
│   └── navigations.ts            # منوها
├── public/
│   └── fonts/                    # فونت وزیرمتن
├── middleware.ts                 # محافظت از مسیرها
├── query.sql                     # ساختار دیتابیس
└── .env.example                  # متغیرهای محیطی
```

---

## 🛠️ تکنولوژی‌ ها

| تکنولوژی | نسخه | کاربرد |
|----------|------|--------|
| [Next.js](https://nextjs.org) | 15 | فریمورک اصلی (App Router) |
| [TypeScript](https://www.typescriptlang.org) | 5.6 | تایپ‌ سیفتی |
| [PostgreSQL](https://www.postgresql.org) | 14+ | دیتابیس |
| [pg](https://node-postgres.com) | 8.13 | اتصال به PostgreSQL |
| [Tailwind CSS](https://tailwindcss.com) | 4.3 | استایل‌ دهی |
| [jose](https://github.com/panva/jose) | 5.9 | JWT در Edge Runtime |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 2.4 | هش پسورد |
| [Resend](https://resend.com) | 4 | ارسال ایمیل |
| [Lucide Icons](https://lucide.dev) | 0.4 | آیکون‌ ها |
| [tsx](https://github.com/privatenumber/tsx) | 4.19 | اجرای اسکریپت‌ های TypeScript |
| [dotenv](https://github.com/motdotla/dotenv) | 16.4 | بارگذاری متغیرهای محیطی |

---

## 📝 دستورات مفید

```bash
# اجرای حالت توسعه
npm run dev

# ساخت برای محیط تولید
npm run build

# اجرای نسخهٔ تولیدی
npm start

# بررسی خطاهای تایپی
npm run lint

# ساخت اولین کاربر ادمین
npm run create-admin
```

---

## 🗺️ نقشهٔ راه

- [x] احراز هویت کامل (ثبت‌ نام، ورود، خروج)
- [x] بازیابی رمز عبور از طریق ایمیل
- [x] نقش‌ های کاربری (RBAC)
- [x] پنل مدیریت با مدیریت کاربران
- [x] پروفایل کاربر با ویرایش نام
- [x] حالت‌ های Loading، Error، 404
- [x] فونت فارسی وزیرمتن
- [x] اسکریپت ساخت ادمین (`create-admin`)
- [x] مستندات کامل
- [ ] حالت تاریک (Dark Mode)
- [ ] احراز هویت دو مرحله‌ای (2FA)
- [ ] ورود با گوگل (OAuth)
- [ ] آپلود تصویر پروفایل

---

## 🤝 مشارکت

از مشارکت شما استقبال می‌کنیم! 🎉 برای مشارکت:

1. ریپازیتوری را **Fork** کنید
2. یک برنچ جدید بسازید: `git checkout -b feature/amazing-feature`
3. تغییرات را کامیت کنید: `git commit -m 'feat: add amazing feature'`
4. به برنچ اصلی پوش کنید: `git push origin feature/amazing-feature`
5. یک **Pull Request** باز کنید

### 📋 قوانین مشارکت

- ✅ از **TypeScript** استفاده کنید (بدون `any`)
- ✅ کدهای خود را **تست** کنید
- ✅ از **کامیت‌ های معنادار** استفاده کنید
- ✅ **مستندات** را به‌ روز نگه دارید

---

## 📄 لایسنس

شما آزادید:
- ✅ از این پروژه استفاده کنید
- ✅ آن را تغییر دهید
- ✅ آن را در پروژه‌ های تجاری استفاده کنید
- ✅ آن را دوباره توزیع کنید

تنها شرط:
- 📝 کپی‌ رایت و لایسنس اصلی را حفظ کنید

---

## 🙏 تشکر و قدردانی

این پروژه با الهام از پروژه‌ های زیر ساخته شده است:

- [Next.js](https://nextjs.org) - فریمورک فوق‌ العاده
- [Tailwind CSS](https://tailwindcss.com) - استایل ‌دهی انعطاف‌ پذیر
- [Resend](https://resend.com) - سرویس ایمیل مدرن
- [Lucide](https://lucide.dev) - آیکون‌ های زیبا

---

## 📞 تماس و پشتیبانی

اگر سوالی دارید یا با مشکلی مواجه شدید:

- 🐛 [گزارش باگ](https://github.com/Ali4-08/boilerplate/issues)
- 💡 [پیشنهاد ویژگی](https://github.com/Ali4-08/boilerplate/issues)
- 📧 ایمیل: [abnextdev@gmail.com](mailto:abnextdev@gmail.com)
- 🐙 گیت‌ هاب: [Ali](https://github.com/Ali4-08)
---

## ⭐ حمایت از پروژه

اگر این پروژه برایتان مفید بود، لطفاً یک ⭐ به ریپازیتوری بدهید!

این کار به ما انگیزه می‌دهد تا پروژه را ادامه دهیم و ویژگی‌های بیشتری اضافه کنیم. ❤️

---

<div align="center">

**ساخته شده با ❤️ توسط [علی باقری]**

</div>

</div>
```