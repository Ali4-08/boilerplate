"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function errorPage({ error, reset }: ErrorProps) {

    useEffect(() => {
        console.error(error);
    }, [error])
    
  return (
    <main className="bg-background min-h-screen p-4 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle
            size={24}
            className="bg-yellow-400 rounded-md w-10 h-10 p-1"
          />
          <h2 className="text-xl font-semibold text-text-main">
            مشکلی پیش آمد!
          </h2>
        </div>

        <p className="text-text-muted">
          دکمه تلاش مجدد را کلیک کنید، درصورت برطرف نشدن خطا با پشتیبانی تماس
          بگیرید.
        </p>

        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-md bg-primary hover:bg-primary-hover text-surface transition-colors duration-300"
        >
          تلاش مجدد
        </button>
      </div>
    </main>
  );
}
