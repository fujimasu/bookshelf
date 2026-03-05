import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-noto-sans"
});

const notoSerifJP = Noto_Serif_JP({
    subsets: ["latin"],
    weight: ["500", "700"],
    variable: "--font-noto-serif"
});

export const metadata: Metadata = {
    title: "BookShelf",
    description: "国立国会図書館の蔵書から検索できる招待制の書籍口コミ・本棚管理Webアプリ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
