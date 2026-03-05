"use client";

import { useState } from "react";
import { Header } from "@/components/Header";

export default function LoginScreen() {
    const [mode, setMode] = useState("login");

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-5 py-12">
                <div className="max-w-[400px] mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-[28px] text-[#2C4A52] m-0">
                            {mode === "login" ? "ログイン" : "新規登録"}
                        </h2>
                    </div>

                    <div className="bg-[#FDFCFA] rounded-xl border border-[#E8E4DC] p-7">
                        {mode === "register" && (
                            <div className="mb-4">
                                <label className="block text-[13px] text-[#5A5347] mb-1.5 font-semibold">招待コード</label>
                                <input
                                    placeholder="招待コードを入力"
                                    className="w-full px-3 py-2.5 border-2 border-[#E8E4DC] rounded-lg text-sm font-sans outline-none focus:border-[#2C4A52] transition-colors"
                                />
                            </div>
                        )}

                        {mode === "register" && (
                            <div className="mb-4">
                                <label className="block text-[13px] text-[#5A5347] mb-1.5 font-semibold">ユーザー名</label>
                                <input
                                    placeholder="表示名"
                                    className="w-full px-3 py-2.5 border-2 border-[#E8E4DC] rounded-lg text-sm font-sans outline-none focus:border-[#2C4A52] transition-colors"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-[13px] text-[#5A5347] mb-1.5 font-semibold">メールアドレス</label>
                            <input
                                type="email"
                                placeholder="mail@example.com"
                                className="w-full px-3 py-2.5 border-2 border-[#E8E4DC] rounded-lg text-sm font-sans outline-none focus:border-[#2C4A52] transition-colors"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-[13px] text-[#5A5347] mb-1.5 font-semibold">パスワード</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3 py-2.5 border-2 border-[#E8E4DC] rounded-lg text-sm font-sans outline-none focus:border-[#2C4A52] transition-colors"
                            />
                        </div>

                        <button className="w-full py-3 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-[15px] font-semibold cursor-pointer font-sans hover:bg-[#233b41] transition-colors">
                            {mode === "login" ? "ログイン" : "登録する"}
                        </button>

                        <p className="text-center mt-4 text-[13px] text-[#8A8477]">
                            {mode === "login" ? (
                                <span>アカウントをお持ちでない方は <button onClick={() => setMode("register")} className="text-[#2C4A52] font-semibold cursor-pointer hover:underline bg-transparent border-none p-0 inline">新規登録</button></span>
                            ) : (
                                <span>すでにアカウントをお持ちの方は <button onClick={() => setMode("login")} className="text-[#2C4A52] font-semibold cursor-pointer hover:underline bg-transparent border-none p-0 inline">ログイン</button></span>
                            )}
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
