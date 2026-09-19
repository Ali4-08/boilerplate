// \components\admin\ChangeRolButton.tsx

"use client";

import { Edit } from "lucide-react";
import type { ApiResponse } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ChangeRoleProps {
  userId: number;
  userRole: string;
  username: string;
  currentUserId: number;
}

export default function ChangeRoleButton({
  userId,
  userRole,
  currentUserId,
  username,
}: ChangeRoleProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const isSelf = userId === currentUserId;

  async function handleToggleRole() {
    if (userId === currentUserId) {
      window.alert("شما نمی توانید نقش خود را تغییر دهید");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userRole }),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        alert(data.message || "تغییر نقش با موفقیت انجام شد");
        router.refresh();
      } else {
        alert(data.error || "خطا در تغییر نقش کاربر");
        return;
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggleRole}
      title={userRole === "USER" ? "تغییر نقش به مدیر" : "تغییر نقش به کاربر"}
      disabled={loading || isSelf}
      className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg p-2 transition-colors duration-300"
    >
      <Edit size={22} />
    </button>
  );
}
