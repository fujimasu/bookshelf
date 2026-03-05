"use client";

import { Header } from "@/components/Header";

export default function AdminScreen() {
    const codes = [
        { code: "BOOK-2025-A1B2", status: "有効", created: "2025-02-01", used: false },
        { code: "BOOK-2025-C3D4", status: "使用済", created: "2025-01-15", used: true },
        { code: "BOOK-2025-E5F6", status: "有効", created: "2025-02-20", used: false },
    ];

    const TAGS = ["ミステリー", "SF", "ビジネス", "自己啓発", "小説", "技術書", "歴史", "エッセイ", "泣ける", "初心者向け"];

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-5 py-8">
                <h2 className="font-serif text-[24px] text-[#2C4A52] mb-6">管理者画面</h2>

                <div className="bg-[#FDFCFA] rounded-xl border border-[#E8E4DC] p-6 mb-6">
                    <h3 className="m-0 mb-4 text-[17px] text-[#2C4A52] font-serif">招待コード管理</h3>
                    <button className="px-5 py-2 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-[13px] font-semibold cursor-pointer mb-4 font-sans hover:bg-[#233b41] transition-colors">
                        ＋ 新規発行
                    </button>

                    <div className="flex flex-col gap-2">
                        {codes.map(c => (
                            <div key={c.code} className={`flex justify-between items-center px-3.5 py-2.5 rounded-lg border border-[#E8E4DC] text-sm ${c.used ? 'bg-[#F5F3EF]' : 'bg-white'}`}>
                                <code className="font-mono text-[#2C4A52] font-semibold">{c.code}</code>
                                <div className="flex gap-3 items-center">
                                    <span className="text-xs text-[#8A8477]">{c.created}</span>
                                    <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold ${c.used ? 'bg-[#E8E4DC] text-[#8A8477]' : 'bg-[#EDF5EE] text-[#3A5A40]'}`}>
                                        {c.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#FDFCFA] rounded-xl border border-[#E8E4DC] p-6">
                    <h3 className="m-0 mb-4 text-[17px] text-[#2C4A52] font-serif">タグマスタ管理</h3>
                    <div className="flex gap-2 mb-4">
                        <input
                            placeholder="新しいタグ名"
                            className="flex-1 px-3 py-2 border-2 border-[#E8E4DC] rounded-lg text-sm font-sans outline-none focus:border-[#2C4A52] transition-colors"
                        />
                        <button className="px-5 py-2 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-[13px] font-semibold cursor-pointer font-sans hover:bg-[#233b41] transition-colors">
                            追加
                        </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {TAGS.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8E4DC] rounded-full text-[13px] text-[#5A5347]">
                                {tag}
                                <button className="bg-transparent border-none cursor-pointer text-[#8A8477] font-bold hover:text-[#5A5347] p-0">×</button>
                            </span>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
