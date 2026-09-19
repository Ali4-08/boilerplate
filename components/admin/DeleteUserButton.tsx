// \components\admin\DeleteUserButton.tsx

"use client";

import { Trash2 } from "lucide-react";
import { appError } from "@/lib/logError";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ApiResponse } from "@/lib/types";



interface DeleteUserProps{
    userId: number;
    currentUserId: number;
    username: string;   
}

export default function DeleteUserButton({userId, username, currentUserId}: DeleteUserProps){
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const isSelf = userId === currentUserId;
    
    async function handleDelete(){       

        if(userId === currentUserId){
            return window.alert("شما نمی توانید حساب خود را حذف کنید");
        }

        const isConfirmed = window.confirm(`آیا از حذف ${username} اطمینان دارید ؟`);
        if(!isConfirmed) return;

        setLoading(true);

        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: "DELETE",
            });
            const data: ApiResponse = await response.json();

            if(response.ok){
                router.refresh();
            } else {
                alert(data.error || "خطا در حذف کاربر");
            }
        } catch (error) {
            appError(error, "DeleteUserButton");
            alert("خطای شبکه، لطفا دوباره تلاش کنید");
        } finally{
            setLoading(false);
        }
    }

    return(
        <button
        onClick={handleDelete}
        disabled={loading || isSelf}
        title="حذف کاربر"
        className="bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400 disabled:cursor-not-allowed p-2 rounded-lg transition-colors duration-300"
        >
            <Trash2 size={22} />
        </button>
    )
}