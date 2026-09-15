// \app\forgot-password\page.tsx

'use client';

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage(){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent)  {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        if(!email){
            setError("آدرس ایمیل را وارد کنید");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });
            await response.json();

            setMessage("اگر ایمیل وجود داشته باشد، لینک تغییر رمز عبور برایش ارسال خواهد شد.");
        } catch (error) {
            setError("خطای شبکه، لطفا دوباره تلاش کنید.");
        } finally{
            setLoading(false);
        }
    }

    return(
        <main className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
            <div className="w-full max-w-md p-4 border border-gray-200 shadow-sm rounded-lg space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    بازیابی رمز عبور
                </h1>

                <p className="text-gray-700 text-center">
                    ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود
                </p>

                <form
                onSubmit={handleSubmit}
                className="space-y-4"
                >
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            آدرس ایمیل
                        </label>
                        <input type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400 transition-all duration-300" />
                    </div>

                    {message && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <p className="text-green-700 text-sm">
                                {message}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-red-700 text-sm">
                                {error}
                            </p>
                        </div>
                    )}

                    <div>
                        <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 transition-colors duration-300">
                            <Mail size={22}/>
                            <span>
                                {loading ? "درحال ارسال..." : "ارسال"}
                            </span>
                        </button>
                    </div>

                    <Link
                    href={"/login"}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-300"
                    >
                        بازگشت به صفحه ورود
                    </Link>
                </form>
            </div>
        </main>
    )
}