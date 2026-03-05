"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { BookCover } from "@/components/BookCover";
import { Stars } from "@/components/Stars";
import { VisibilityBadge } from "@/components/Badge";
import { INIT_MY_SHELVES, MOCK_REVIEWS } from "@/lib/mock";

function BookDetailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [myRating, setMyRating] = useState(0);
    const [liked, setLiked] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [shelfMenuOpen, setShelfMenuOpen] = useState(false);
    const [myShelves, setMyShelves] = useState(INIT_MY_SHELVES);

    const id = searchParams.get("id") || "1";
    const title = searchParams.get("title") || "不明なタイトル";
    const author = searchParams.get("author") || "不明";
    const publisher = searchParams.get("pub") || "不明";
    const thumbnail = searchParams.get("thumb") || "";
    const isbn = searchParams.get("isbn") || "";
    const year = searchParams.get("year") || "";

    const book = { id, title, author, publisher, thumbnail_url: thumbnail, isbn, published_year: year, rating: 0, reviews: 0, likes: 0 };
    const inShelves = myShelves.filter(s => s.books.some(bk => bk.id === book.id));

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-5 py-8">
                <button
                    onClick={() => router.back()}
                    className="bg-transparent border-none text-[#8A8477] cursor-pointer text-sm font-sans mb-4 p-0 hover:underline"
                >
                    ← 検索結果に戻る
                </button>

                <div className="flex gap-8 mb-8 flex-wrap">
                    <BookCover title={book.title} index={parseInt(book.id) % 6} size="lg" thumbnail={book.thumbnail_url} />
                    <div className="flex-1 min-w-[240px]">
                        <h2 className="m-0 font-serif text-[26px] text-[#2C4A52] line-clamp-3 leading-snug">{book.title}</h2>
                        <p className="m-0 mt-2 text-[#5A5347] text-[15px]">{book.author}</p>

                        <div className="mt-4 flex flex-col gap-1.5 text-sm text-[#8A8477]">
                            <span>出版社：{book.publisher}</span>
                            <span>ISBN：{book.isbn}</span>
                            <span>出版年：{book.published_year}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-5">
                            <Stars rating={book.rating} size={22} />
                            <span className="text-[22px] font-bold text-[#2C4A52]">{book.rating.toFixed(1)}</span>
                            <span className="text-[13px] text-[#8A8477]">（{book.reviews}件のレビュー）</span>
                        </div>

                        <div className="flex gap-2.5 mt-5 flex-wrap">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`px-5 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-sans font-semibold transition-all ${liked ? "border-[#E8A838] bg-[#FDF5E6] text-[#C4880C]" : "border-[#D5D1C8] bg-[#FDFCFA] text-[#5A5347] hover:bg-slate-50"
                                    }`}
                            >
                                ♥ イイネ {liked ? book.likes + 1 : book.likes}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setShelfMenuOpen(!shelfMenuOpen)}
                                    className={`px-5 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-sans font-semibold transition-all flex items-center gap-2 ${inShelves.length > 0 ? "border-[#3A5A40] bg-[#EDF5EE] text-[#3A5A40]" : "border-[#D5D1C8] bg-[#FDFCFA] text-[#5A5347] hover:bg-slate-50"
                                        }`}
                                >
                                    <span>📚 本棚に追加</span>
                                    <span className="text-[10px]">▼</span>
                                </button>

                                {shelfMenuOpen && (
                                    <div className="absolute top-full left-0 mt-1.5 bg-white border border-[#E8E4DC] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-2 min-w-[260px] z-10 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-2.5 py-1.5 text-xs text-[#8A8477] font-semibold border-b border-[#E8E4DC] mb-1">
                                            追加する本棚を選択
                                        </div>
                                        {myShelves.map(shelf => {
                                            const isIn = shelf.books.some(bk => bk.id === book.id);
                                            return (
                                                <div
                                                    key={shelf.id}
                                                    onClick={() => {
                                                        if (isIn) {
                                                            setMyShelves(myShelves.map(s => s.id === shelf.id ? { ...s, books: s.books.filter(bk => bk.id !== book.id) } : s));
                                                        } else {
                                                            setMyShelves(myShelves.map(s => s.id === shelf.id ? { ...s, books: [...s.books, book] } : s));
                                                        }
                                                    }}
                                                    className={`flex items-center justify-between px-2.5 py-2 rounded-md cursor-pointer transition-colors ${isIn ? "bg-[#EDF5EE]" : "bg-transparent hover:bg-[#F5F3EF]"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2 text-[#2C4A52]">
                                                        <span className="text-[16px] w-5 text-center">{isIn ? "✓" : "○"}</span>
                                                        <span className={`text-sm ${isIn ? 'font-semibold' : 'font-normal'}`}>{shelf.name}</span>
                                                    </div>
                                                    <VisibilityBadge isPublic={shelf.isPublic} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {inShelves.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap mt-3">
                                {inShelves.map(s => (
                                    <span key={s.id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EDF5EE] rounded-full text-xs text-[#3A5A40] font-medium border border-[#CDE0D2]">
                                        📚 {s.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Review Form */}
                <div className="bg-[#FDFCFA] rounded-xl border border-[#E8E4DC] p-6 mb-6">
                    <h3 className="m-0 mb-4 font-serif text-[18px] text-[#2C4A52]">レビューを投稿</h3>
                    <div className="flex gap-1 mb-3 items-center">
                        {[1, 2, 3, 4, 5].map(i => (
                            <span
                                key={i}
                                onClick={() => setMyRating(i)}
                                className={`cursor-pointer text-[28px] transition-colors leading-none select-none ${i <= myRating ? "text-[#E8A838]" : "text-[#D5D1C8]"}`}
                            >
                                ★
                            </span>
                        ))}
                        {myRating > 0 && <span className="text-[13px] text-[#8A8477] ml-2 font-semibold">{myRating}.0</span>}
                    </div>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        placeholder="この本の感想を書いてください..."
                        className="w-full min-h-[80px] p-3 border-2 border-[#E8E4DC] rounded-lg text-sm font-sans resize-y outline-none bg-white focus:border-[#2C4A52] transition-colors"
                    />
                    <button
                        disabled={myRating === 0 || !reviewText.trim()}
                        className="mt-2.5 px-7 py-2.5 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-sm font-semibold cursor-pointer font-sans disabled:opacity-50 hover:bg-[#233b41] transition-colors"
                    >
                        投稿する
                    </button>
                </div>

                {/* Reviews */}
                <h3 className="font-serif text-[18px] text-[#2C4A52] mb-4">レビュー一覧</h3>
                <div className="flex flex-col gap-3">
                    {MOCK_REVIEWS.map(r => (
                        <div key={r.id} className="p-4 bg-[#FDFCFA] rounded-xl border border-[#E8E4DC]">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-[#E8E4DC] flex items-center justify-center text-sm text-[#5A5347] font-semibold">
                                        {r.user.charAt(0)}
                                    </div>
                                    <span className="font-semibold text-sm text-[#2C4A52]">{r.user}</span>
                                </div>
                                <span className="text-xs text-[#8A8477]">{r.date}</span>
                            </div>
                            <Stars rating={r.rating} size={14} />
                            <p className="mt-2 mb-0 text-sm text-[#5A5347] leading-relaxed">{r.text}</p>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default function BookDetailScreen() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookDetailContent />
        </Suspense>
    );
}
