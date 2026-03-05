"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { BookCover } from "@/components/BookCover";
import { Stars } from "@/components/Stars";
import { MOCK_BOOKS } from "@/lib/mock";
import { searchBooks, BookEntry } from "@/lib/api/ndl";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<BookEntry[]>(MOCK_BOOKS);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const books = await searchBooks(query);
            if (books.length > 0) {
                setResults(books);
            } else {
                setResults([]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="max-w-[800px] mx-auto px-5 py-8">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-[28px] text-[#2C4A52] m-0">書籍をさがす</h2>
                    <p className="text-[#8A8477] text-sm mt-2">国立国会図書館の蔵書から検索できます</p>
                </div>

                <div className="flex gap-2 max-w-[600px] mx-auto mb-8">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                        placeholder="タイトル、著者名、ISBNで検索..."
                        className="flex-1 px-4 py-3 border-2 border-[#D5D1C8] rounded-lg text-[15px] font-sans outline-none bg-[#FDFCFA] transition-colors focus:border-[#2C4A52]"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="px-6 py-3 bg-[#2C4A52] text-[#F5F0E8] border-none rounded-lg text-[15px] font-semibold cursor-pointer font-sans disabled:opacity-70"
                    >
                        {loading ? "検索中..." : "検索"}
                    </button>
                </div>

                <p className="text-[#8A8477] text-[13px] mb-4">検索結果：{results.length}件</p>

                <div className="flex flex-col gap-4">
                    {results.map((book, i) => (
                        <div
                            key={book.id}
                            onClick={() => {
                                // In a real app we would save the book to context or URL params if not in DB
                                // We'll pass information via URL state or fetch on the detail page
                                router.push(`/books/${book.id}?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&thumb=${encodeURIComponent(book.thumbnail_url)}&pub=${encodeURIComponent(book.publisher)}&year=${encodeURIComponent(book.published_year)}&isbn=${encodeURIComponent(book.isbn)}`);
                            }}
                            className="flex gap-4 p-4 bg-[#FDFCFA] rounded-[10px] border border-[#E8E4DC] cursor-pointer transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-[#C4B9A8]"
                        >
                            <BookCover title={book.title} index={i} size="sm" thumbnail={book.thumbnail_url} />
                            <div className="flex-1 min-w-0">
                                <h3 className="m-0 text-[17px] font-serif text-[#2C4A52] line-clamp-2 leading-snug">{book.title}</h3>
                                <p className="mt-1 mb-0 text-[13px] text-[#8A8477]">{book.author} / {book.publisher} / {book.published_year}</p>

                                {/* Mock rating data for display */}
                                <div className="flex items-center gap-3 mt-2.5">
                                    <span className="flex items-center gap-1">
                                        <Stars rating={4.0} size={14} />
                                        <span className="text-[13px] text-[#5A5347] font-semibold">4.0</span>
                                    </span>
                                    <span className="text-xs text-[#8A8477]">レビュー 0件</span>
                                    <span className="text-xs text-[#8A8477]">♥ 0</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {results.length === 0 && !loading && (
                        <div className="text-center py-10 text-[#8A8477]">
                            見つかりませんでした。別のキーワードで検索してください。
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
