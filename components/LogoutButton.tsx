// \components\LogoutButton.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appError } from "@/lib/logError";


export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
        router.push("/login");
      } else {
        alert("خطا در خروج از حساب");
      }
    } catch (error) {
      appError(error, "Logout Button");
      alert("خطای شبکه رخ داده");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-12 py-2 rounded-md transition-colors duration-200"
    >
      {loading ? "درحال خروج..." : "خروج"}
    </button>
  );
}
