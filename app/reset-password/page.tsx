// \app\reset-password\page.tsx

'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { KeyRound } from "lucide-react";
import { ApiResponse } from "@/lib/types";


function ResetPasswordForm(){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const router = useRouter();

    // اعتبار سنجی توکن
    if(!token){
        return(
            <div
            className="min-h-screen flex flex-col items-center justify-center gap-2"
            >
                <h1 className="text-3xl font-semibold text-gray-900">لینک بازیابی نامعتبر است</h1>
                <p className="text-lg font-medium text-gray-600">لطفا دوباره درخاست بازیابی رمز بدهید</p>
            </div>
        );
    }

    // بررسی توکن و رمز عبور و تغییر رمز عبور
    async function handleSubmit (e: React.FormEvent) {
        e.preventDefault();          
        
        setError("");

        if(password.length < 8){
            setError("رمز عبور باید حداقل 8 کاراکتر باشد"); 
            return;           
        }

        if(password !== confirmPassword){
            setError("رمز عبور با تکرار رمز عبور مطابقت ندارد");     
            return;      
        }

        setLoading(true);

        try {
           const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token, password})
           });

           const data: ApiResponse = await response.json();

           if(response.ok){
            router.push("/login?reset=success");
           }else {
            setError(data.error || "خطایی رخ داده");
           }

        } catch (error) {
            
        } finally {
            setLoading(false);            
        }
    }

    return(
        <main className="flex items-center justify-center min-h-screen">
            <div className="border w-full max-w-md rounded-lg border-gray-200 shadow-sm p-4">
                
                {/* عنوان فرم */}
                <h2 className="flex items-center gap-2 border-b border-gray-300 pb-4 mb-5">
                    <KeyRound size={22} className="text-yellow-500 fill-yellow-200"/>
                    <span className="text-xl font-semibold text-gray-700">بازیابی رمز عبور</span>
                </h2>

                {/* فرم */}
                <form 
                onSubmit={handleSubmit}
                className="space-y-5">
                    {/* رمز عبور */}
                    <div>
                        <label 
                        htmlFor="password"
                        className="block text-gray-600 mb-2 font-medium">
                            رمز عبور
                        </label>
                        <input type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        autoComplete="new-password"
                        className="border border-gray-300 rounded-md w-full px-4 py-2 outline-none focus:ring-2 ring-blue-400 focus:border-transparent transition-all duration-300" />
                    </div>

                     {/* تکرار رمز عبور */}
                    <div>
                        <label 
                        htmlFor="confirmPassword"
                        className="block text-gray-600 mb-2 font-medium">
                            تکرار رمز عبور
                        </label>
                        <input type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={8}
                        autoComplete="new-password"
                        className="border border-gray-300 rounded-md w-full px-4 py-2 outline-none focus:ring-2 ring-blue-400 focus:border-transparent transition-all duration-300" />
                    </div>

                    {/* پیغام خطا در صورت وجود */}
                    {error && (
                        <p className="text-lg text-red-600">
                            {error}
                        </p>
                    )}

                    {/* دکمه ها */}
                    <div>
                        <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-3 transition-colors duration-300">
                            {loading ? "درحال ثبت..." : "ثبت"}
                        </button>
                    </div>
                </form>

            </div>
        </main>
    )
}

export default function ResetPasswordPage(){
    return(
        <Suspense fallback={<div>درحال بارگزاری اطلاعات...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}