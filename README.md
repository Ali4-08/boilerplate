
```markdown
# بویلرپلیت فارسی نکست‌جی‌اس | Persian Next.js Boilerplate

یک بویلرپلیت مدرن، امن و آماده استفاده برای پروژه‌های فارسی با پشتیبانی کامل از راست چین (RTL)، فونت وزیرمتن و سیستم احراز هویت کامل.

## ✨ ویژگی‌ها

### 🔐 احراز هویت و امنیت
- سیستم ثبت نام و ورود کامل با فرم‌های تعاملی
- هش کردن پسورد با `bcryptjs` (Salt Rounds = 10)
- احراز هویت با **JWT** (JSON Web Token) با کتابخانه `jose`
- ذخیره توکن در **HttpOnly Cookie** (جلوگیری از XSS)
- محافظت از مسیرهای خصوصی با **Middleware**
- جلوگیری از **SQL Injection** با Parameterized Queries
- جلوگیری از **User Enumeration Attack** (پیام خطای یکسان)

### 🎨 رابط کاربری
- طراحی کاملاً راست چین (RTL) با فونت **وزیرمتن**
- طراحی ریسپانسیو با **Tailwind CSS v4**
- انیمیشن‌های نرم و تعاملات ریز (Micro-interactions)
- فرم‌های تعاملی با نمایش/مخفی کردن پسورد
- حالت های Loading و Error در فرم‌ها

### 🛠️ زیرساخت
- **Next.js 15** با App Router و Route Groups
- **TypeScript** با تایپ های دقیق (بدون `any`)
- **PostgreSQL** با Connection Pool (جلوگیری از Connection Leak)
- **Singleton Pattern** برای مدیریت اتصال دیتابیس
- ساختار پوشه بندی حرفه‌ای و مقیاس پذیر

## 🚀 تکنولوژی‌ها

| تکنولوژی | نسخه | کاربرد |
|--------------|------|------------------|
| Next.js      |  15  | فریمورک اصلی    |
| TypeScript   |  5   | تایپ‌سیفتی       |
| Tailwind CSS |  v4  | استایل‌دهی       |
| PostgreSQL   |  -   | دیتابیس         |
| pg | -       |      | اتصال به دیتابیس|
| bcryptjs | - |      | هش کردن پسورد   |
| jose | -     |      | ساخت و بررسی JWT|
| lucide-react |  -   | آیکون‌ها         |

## 📋 پیش نیازها

قبل از شروع، باید این ابزارها روی سیستم شما نصب باشند:

- **Node.js** نسخه 18 یا بالاتر
- **PostgreSQL** نسخه 14 یا بالاتر
- **Git**

## 🔧 نصب و راه‌اندازی

### 1️⃣ کلون کردن پروژه

```bash
git clone [https://github.com/Ali4-08/boilerplate.git]
cd [nextjs-boilerplate]
```

### 2️⃣ نصب وابستگی ها

```bash
npm install
```

### 3️⃣ راه‌اندازی دیتابیس

ابتدا در **DBeaver** یا **pgAdmin** یک دیتابیس جدید بسازید، سپس کوئری زیر را اجرا کنید:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4️⃣ تنظیم متغیرهای محیطی

فایل `.env.example` را به `.env.local` تغییر نام دهید:

```bash
# ویندوز
copy .env.example .env.local

# مک/لینوکس
cp .env.example .env.local
```

سپس مقادیر را در فایل `.env.local` تنظیم کنید:

```env
# اتصال به دیتابیس
DATABASE_URL=postgresql://username:password@localhost:5432/your_database

# کلید مخفی JWT (یک رشته تصادفی حداقل 32 کاراکتری)
# برای تولید می‌توانید از دستور زیر استفاده کنید:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your-super-secret-key-here
```

### 5️⃣ اجرای پروژه

```bash
npm run dev
```

حالا مرورگر را باز کنید و به `http://localhost:3000` بروید. 🎉

## 📁 ساختار پروژه

```
├── app/
│   ├── (auth)/                    # Route Group برای احراز هویت
│   │   ├── login/
│   │   │   └── page.tsx          # صفحه ورود
│   │   └── register/
│   │       └── page.tsx          # صفحه ثبت‌نام
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts      # API ورود
│   │       └── register/
│   │           └── route.ts      # API ثبت‌نام
│   ├── dashboard/
│   │   └── page.tsx              # داشبورد محافظت‌شده
│   ├── globals.css               # استایل‌های سراسری
│   ├── layout.tsx                # Layout اصلی
│   └── page.tsx                  # صفحه اصلی
├── lib/
│   ├── db.ts                     # اتصال PostgreSQL (Singleton Pool)
│   ├── jwt.ts                    # ساخت و بررسی JWT
│   └── types.ts                  # تایپ‌های TypeScript
├── public/
│   └── fonts/                    # فونت‌های وزیرمتن
│       ├── Vazirmatn-Bold.woff2
│       └── Vazirmatn-Regular.woff2
├── middleware.ts                 # محافظت از مسیرها
├── .env.example                  # نمونه متغیرهای محیطی
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## 🔒 نکات امنیتی

این بویلرپلیت با رعایت بهترین روش های امنیتی ساخته شده است:

- ✅ پسوردها هرگز به صورت متن ساده ذخیره نمی شوند
- ✅ توکن ها در **HttpOnly Cookie** ذخیره می شوند (جلوگیری از سرقت با XSS)
- ✅ کوکی ها با ویژگی های `Secure`, `SameSite` و `HttpOnly` محافظت می شوند
- ✅ از **Parameterized Queries** برای جلوگیری از SQL Injection استفاده می‌شود
- ✅ پیام های خطای یکسان برای جلوگیری از تشخیص وجود کاربر

## 📦 دستورات

| دستور | توضیح |
|-------|--------|
| `npm run dev` | اجرای سرور توسعه |
| `npm run build` | ساخت نسخه پروداکشن |
| `npm start` | اجرای نسخه پروداکشن |
| `npm run lint` | بررسی کد با ESLint |

## 🗺️ نقشه راه

این بویلرپلیت در حال توسعه است و ویژگی های زیر در نسخه های آینده اضافه خواهند شد:

- [ ] پروفایل کاربر و ویرایش اطلاعات
- [ ] خروج از حساب (Logout)
- [ ] پنل مدیریت (Admin Panel)
- [ ] سطوح دسترسی (Role-based Access)
- [ ] بازیابی رمز عبور
- [ ] اعتبارسنجی سمت سرور با Zod
- [ ] دیپلوی روی Vercel

## 📄 لایسنس

این پروژه تحت لایسنس **MIT** منتشر شده است. شما می توانید آزادانه از آن در پروژه‌های شخصی و تجاری خود استفاده کنید.

## 👨‍💻 توسعه‌دهنده

ساخته شده با ❤️ توسط **علی**

---

اگر این پروژه برای شما مفید بوده، لطفاً به ریپازیتوری یک ⭐ بدهید.
```