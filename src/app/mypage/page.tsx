"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Badge, VisibilityBadge } from "@/components/Badge";
import { BookCover } from "@/components/BookCover";
import { Stars } from "@/components/Stars";
import { TAGS, INIT_MY_SHELVES, MOCK_BOOKS } from "@/lib/mock";

export default function MyPageScreen() {
    const [myShelves, setMyShelves] = useState(INIT_MY_SHELVES);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPublic, setNewPublic] = useState(true);
    const [newTags, setNewTags] = useState<string[]>([]);

    const myReviews = [
        { book: MOCK_BOOKS[1], rating: 5, text: "何度読み返しても色褪せない作品。", date: "2025-02-20" },
        { book: MOCK_BOOKS[4], rating: 4, text: "音楽の描写が秀逸。コンクールの緊張感が伝わってくる。", date: "2025-01-15" },
    ];

    const handleCreate = () => {
        if (!newName.trim()) return;
        const shelf = {
            id: Date.now(), name: newName.trim(), isPublic: newPublic, tags: newTags,
            books: [], updatedAt: new Date().toISOString().split("T")[0],
        };
        setMyShelves([shelf, ...myShelves]);
        setNewName(""); setNewPublic(true); setNewTags([]); setShowCreateModal(false);
    };

    const toggleVisibility = (id: number) => {
        setMyShelves(myShelves.map(s => s.id === id ? { ...s, isPublic: !s.isPublic } : s));
    };

    const deleteShelf = (id: number) => {
        setMyShelves(myShelves.filter(s => s.id !== id));
    };

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-5 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-[#2C4A52] flex items-center justify-center text-[22px] text-[#F5F0E8] font-bold">
                        読
                    </div>
                    <div>
                        <h2 className="m-0 font-serif text-[22px] text-[#2C4A52]">読書好きA</h2>
                        <p className="m-0 mt-1 text-[13px] text-[#8A8477]">
                            本棚 {myShelves.length}個（公開 {myShelves.filter(s => s.isPublic).length} / 非公開 {myShelves.filter(s => !s.isPublic).length}） · レビュー {myReviews.length}件
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-[18px] text-[#2C4A52] m-0">マイ本棚</h3>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-[13px] font-semibold cursor-pointer font-sans hover:bg-[#233b41]"
                    >
                        <span>＋</span> 新しい本棚
                    </button>
                </div>

                {showCreateModal && (
                    <div className="bg-[#FDFCFA] rounded-xl border-2 border-[#2C4A52] p-6 mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                        <h4 className="m-0 mb-4 text-[16px] text-[#2C4A52] font-serif">新しい本棚を作成</h4>
                        <div className="mb-3.5">
                            <label className="block text-[13px] text-[#5A5347] mb-1.5 font-semibold">本棚の名前</label>
                            <input
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="例：今年読みたいミステリー"
                                className="w-full px-3 py-2.5 border-2 border-[#E8E4DC] rounded-lg text-[14px] font-sans outline-none focus:border-[#2C4A52]"
                            />
                        </div>
                        <div className="mb-3.5">
                            <label className="block text-[13px] text-[#5A5347] mb-2 font-semibold">公開設定</label>
                            <div className="flex gap-2.5">
                                <button
                                    onClick={() => setNewPublic(true)}
                                    className={`flex-1 p-2.5 rounded-lg cursor-pointer font-sans text-sm font-semibold transition-colors ${newPublic ? "border-2 border-[#2C6E7A] bg-[#E6F0F2] text-[#2C6E7A]" : "border-2 border-[#E8E4DC] bg-white text-[#8A8477]"
                                        }`}
                                >🌐 公開</button>
                                <button
                                    onClick={() => setNewPublic(false)}
                                    className={`flex-1 p-2.5 rounded-lg cursor-pointer font-sans text-sm font-semibold transition-colors ${!newPublic ? "border-2 border-[#8A7A63] bg-[#F3EDE4] text-[#8A7A63]" : "border-2 border-[#E8E4DC] bg-white text-[#8A8477]"
                                        }`}
                                >🔒 非公開</button>
                            </div>
                            <p className="text-[12px] text-[#8A8477] mt-1.5">
                                {newPublic ? "「みんなの本棚」に表示され、他のユーザーが閲覧できます" : "自分だけが見られるプライベートな本棚になります"}
                            </p>
                        </div>
                        <div className="mb-4.5">
                            <label className="block text-[13px] text-[#5A5347] mb-2 font-semibold">タグ（任意・複数選択可）</label>
                            <div className="flex gap-1.5 flex-wrap">
                                {TAGS.map(tag => (
                                    <Badge
                                        key={tag}
                                        active={newTags.includes(tag)}
                                        onClick={() => setNewTags(newTags.includes(tag) ? newTags.filter(t => t !== tag) : [...newTags, tag])}
                                    >{tag}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2.5 justify-end mt-4">
                            <button
                                onClick={() => { setShowCreateModal(false); setNewName(""); setNewTags([]); }}
                                className="px-5 py-2.5 border-2 border-[#D5D1C8] rounded-lg bg-white text-sm font-semibold cursor-pointer text-[#5A5347] font-sans hover:bg-[#F5F2EC]"
                            >キャンセル</button>
                            <button
                                onClick={handleCreate}
                                disabled={!newName.trim()}
                                className="px-6 py-2.5 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-sm font-semibold cursor-pointer font-sans disabled:opacity-50 hover:bg-[#233b41]"
                            >作成する</button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4 mb-9">
                    {myShelves.map(shelf => (
                        <div key={shelf.id} className="bg-[#FDFCFA] rounded-xl border border-[#E8E4DC] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                            <div className="flex justify-between items-start mb-3.5 flex-col sm:flex-row gap-2">
                                <div>
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <span className="text-[18px]">📚</span>
                                        <h4 className="m-0 text-[16px] font-serif text-[#2C4A52]">{shelf.name}</h4>
                                    </div>
                                    <span className="text-[13px] text-[#8A8477]">{shelf.books.length}冊 · 更新 {shelf.updatedAt}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        onClick={() => toggleVisibility(shelf.id)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E8E4DC] bg-white cursor-pointer text-xs font-semibold font-sans hover:bg-slate-50 ${shelf.isPublic ? "text-[#2C6E7A]" : "text-[#8A7A63]"
                                            }`}
                                    >
                                        {shelf.isPublic ? "🌐 公開中" : "🔒 非公開"}
                                    </button>
                                    <button
                                        onClick={() => deleteShelf(shelf.id)}
                                        className="px-2.5 py-1.5 rounded-lg border border-[#E8E4DC] bg-white cursor-pointer text-xs text-[#C0392B] font-sans hover:bg-red-50"
                                    >削除</button>
                                </div>
                            </div>

                            {shelf.tags.length > 0 && (
                                <div className="flex gap-1.5 flex-wrap mb-3">
                                    {shelf.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-0.5 bg-[#EEEBE5] rounded-xl text-[12px] text-[#6B6459]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {shelf.books.length > 0 ? (
                                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                                    {shelf.books.map((book: any) => (
                                        <div key={book.id} className="flex flex-col items-center gap-1.5 min-w-[88px]">
                                            <BookCover title={book.title} index={book.id ? parseInt(book.id) % 6 : 0} size="sm" thumbnail={book.thumbnail_url} />
                                            <span className="text-[11px] text-[#5A5347] text-center max-w-[82px] leading-tight line-clamp-2">
                                                {book.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[13px] text-[#8A8477] text-center py-3">
                                    まだ本がありません — 検索画面から追加できます
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <h3 className="font-serif text-[18px] text-[#2C4A52] mb-4">投稿したレビュー</h3>
                <div className="flex flex-col gap-3">
                    {myReviews.map((r, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-[#FDFCFA] rounded-xl border border-[#E8E4DC]">
                            <BookCover title={r.book.title} index={parseInt(r.book.id) % 6} size="sm" thumbnail={r.book.thumbnail_url} />
                            <div className="flex-1">
                                <h4 className="m-0 text-[15px] text-[#2C4A52] font-serif">{r.book.title}</h4>
                                <div className="my-1.5"><Stars rating={r.rating} size={13} /></div>
                                <p className="m-0 text-[14px] text-[#5A5347] leading-relaxed">{r.text}</p>
                                <span className="text-[12px] text-[#8A8477] mt-1.5 block">{r.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
