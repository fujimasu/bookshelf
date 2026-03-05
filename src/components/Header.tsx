"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const loggedIn = true; // TODO: Hook up with Supabase Auth

    const nav = [
        { id: "/", label: "検索", icon: "\uD83D\uDD0D" },
        { id: "/shelves", label: "みんなの本棚", icon: "\uD83D\uDCDA" },
        { id: "/mypage", label: "マイページ", icon: "\uD83D\uDC64" },
        { id: "/admin", label: "管理", icon: "\u2699\uFE0F" },
        { id: "/login", label: loggedIn ? "ログアウト" : "ログイン", icon: "\uD83D\uDD11" },
    ];

    return (
        <>
            <header className="bg-[#2C4A52] px-6 h-14 flex items-center justify-between shadow-md">
                <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
                    <span className="text-[22px]">📖</span>
                    <span className="font-serif font-bold text-lg text-[#F5F0E8] tracking-widest">BookShelf</span>
                </Link>
                <nav className="flex gap-1">
                    {nav.map(n => {
                        const isActive = pathname === n.id || (pathname.startsWith("/books/") && n.id === "/");
                        return (
                            <Link
                                key={n.id}
                                href={n.id}
                                className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-[13px] font-sans transition-colors ${isActive ? "bg-white/15 text-[#F5F0E8] font-semibold" : "bg-transparent text-[#F5F0E8]"
                                    }`}
                            >
                                <span className="text-[14px]">{n.icon}</span>
                                <span>{n.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </header>

            <div className={`px-4 py-1.5 text-center text-xs font-medium border-b border-[#E8E4DC] ${loggedIn ? 'bg-[#EDF5EE] text-[#3A5A40]' : 'bg-[#FDF5E6] text-[#C4880C]'}`}>
                {loggedIn ? "✓ ログイン中：読書好きA" : "未ログイン — 閲覧のみ可能です"}
            </div>
        </>
    );
}
