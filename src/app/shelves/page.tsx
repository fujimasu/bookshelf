"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Badge, VisibilityBadge } from "@/components/Badge";
import { BookCover } from "@/components/BookCover";
import { TAGS, MOCK_SHELVES_PUBLIC } from "@/lib/mock";

export default function PublicShelvesScreen() {
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const filtered = activeTag ? MOCK_SHELVES_PUBLIC.filter(s => s.tags.includes(activeTag)) : MOCK_SHELVES_PUBLIC;

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-5 py-8">
                <div className="text-center mb-8">
                    <h2 className="font-serif text-[28px] text-[#2C4A52] m-0">みんなの本棚</h2>
                    <p className="text-[#8A8477] text-sm mt-2">公開されている本棚を覗いてみよう</p>
                </div>

                <div className="flex gap-2 flex-wrap mb-7 justify-center">
                    <Badge active={!activeTag} onClick={() => setActiveTag(null)}>すべて</Badge>
                    {TAGS.slice(0, 7).map(tag => (
                        <Badge key={tag} active={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}>{tag}</Badge>
                    ))}
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-10 text-[#8A8477]">
                        <p className="text-[32px] m-0 mb-2">📚</p>
                        <p>このタグの本棚はまだありません</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {filtered.map(shelf => (
                            <div key={shelf.id} className="bg-[#FDFCFA] rounded-xl border border-[#E8E4DC] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <div className="flex justify-between items-start mb-3.5">
                                    <div>
                                        <div className="flex items-center gap-2.5 mb-1">
                                            <span className="text-[18px]">📚</span>
                                            <h3 className="m-0 text-[17px] font-serif text-[#2C4A52]">{shelf.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-[13px] text-[#8A8477]">
                                            <span>{shelf.owner}</span>
                                            <span>·</span>
                                            <span>{shelf.books.length}冊</span>
                                            <span>·</span>
                                            <span>更新 {shelf.updatedAt}</span>
                                        </div>
                                    </div>
                                </div>

                                {shelf.tags.length > 0 && (
                                    <div className="flex gap-1.5 flex-wrap mb-3.5">
                                        {shelf.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-0.5 bg-[#EEEBE5] rounded-xl text-[12px] text-[#6B6459]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

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
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
