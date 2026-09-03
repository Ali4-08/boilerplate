import { Pool } from "pg";

// ایجاد کانکشن با متغیر لوکال
const connectionString = process.env.DATABASE_URL;

// در صورت عدم تنظیم کانکشن استرینگ پیغام مناسب صادر می شود.
if(!connectionString){
    throw new Error('DATABASE_URL is not set. Please add it to your .env.local file.');
}

// برای اینکه متغیر در کل پروژه در دسترس باشد درون گلوبال تعریف شده است.
declare global {
  var pgPool: Pool | undefined;
}

// اگر کانکشن بود از خودش استفاده میکنه در غیر اینصورت یک نسخه جدید می سازد
const pool = global.pgPool ?? new Pool({
    connectionString: connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// وقتی کانکشن بازه و برنامه به هر دلیلی کرش میکنه کانکشن ها بسته میشن و پیام مناسب صادر میشه
pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

// بررسی اینکه pool در حالت حالت توسعه ساخته بشه
if(process.env.NODE_ENV !== "production"){
    global.pgPool = pool;
}

export default pool;