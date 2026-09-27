import Link from "next/link";
import pool from "@/lib/db";


export default function HomePage() {

  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="space-y-5 sm:space-y-6 text-center max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-text-main">
          به بویلر پلیت من خوش آمدید
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          یک نقطه شروع حرفه‌ای برای پروژه های Next.js فارسی با TypeScript،
          Tailwind CSS و PostgreSQL
        </p>
        <Link 
        href={"/login"}
        className="bg-primary hover:bg-primary-hover text-surface text-base md:text-lg px-6 py-3 rounded-lg transition-colors">
          شروع کنید
        </Link>
      </div>
    </main>
  );
}
