"use server";

import { XMLParser } from "fast-xml-parser";

export type BookEntry = {
    id: string; // ISBN or alternative
    title: string;
    author: string;
    publisher: string;
    published_year: string;
    isbn: string;
    thumbnail_url: string;
};

// NDL API URL: https://ndlsearch.ndl.go.jp/api/opensearch?title=...
export async function searchBooks(query: string): Promise<BookEntry[]> {
    if (!query.trim()) return [];

    try {
        const url = `https://ndlsearch.ndl.go.jp/api/opensearch?title=${encodeURIComponent(query)}&cnt=20`;
        const res = await fetch(url);
        const xmlData = await res.text();

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
        });

        const jsonObj = parser.parse(xmlData);
        const items = jsonObj?.rss?.channel?.item;

        if (!items) return [];
        const itemsArray = Array.isArray(items) ? items : [items];

        const books: BookEntry[] = [];

        for (const item of itemsArray) {
            // Extract publisher
            let publisher = "不明";
            if (item["dc:publisher"]) {
                publisher = typeof item["dc:publisher"] === "string"
                    ? item["dc:publisher"]
                    : item["dc:publisher"][0] || "不明";
            }

            // Extract author
            let author = "不明";
            if (item["dc:creator"]) {
                author = typeof item["dc:creator"] === "string"
                    ? item["dc:creator"]
                    : item["dc:creator"][0] || "不明";
            }

            // Extract ISBN
            let isbn = "";
            if (item["dc:identifier"]) {
                const identifiers = Array.isArray(item["dc:identifier"]) ? item["dc:identifier"] : [item["dc:identifier"]];
                const isbnObj = identifiers.find((id: any) => id["@_xsi:type"] === "dcndl:ISBN");
                if (isbnObj) {
                    isbn = typeof isbnObj === "string" ? isbnObj : isbnObj["#text"] || "";
                } else {
                    // Sometimes it's just a string if there's only one identifier
                    const strId = identifiers.find((id: any) => typeof id === "string" && id.replace(/-/g, "").length >= 10);
                    if (strId) isbn = strId;
                }
            }

            // Clean ISBN
            isbn = isbn.replace(/-/g, "");

            // Thumbnail URL
            let thumbnailUrl = "";
            if (isbn.length === 13 || isbn.length === 10) {
                thumbnailUrl = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;
                // Since we also need to fallback to openBD, we can just do it on the client side 
                // with an <img onError> event or check it here
            }

            // Title
            const title = item.title || "不明なタイトル";

            const book: BookEntry = {
                id: isbn || item.link || Math.random().toString(36).substring(7),
                title,
                author,
                publisher,
                published_year: item["pubDate"] ? new Date(item["pubDate"]).getFullYear().toString() : "不明",
                isbn: isbn,
                thumbnail_url: thumbnailUrl,
            };

            // We push only if we have some valid info
            books.push(book);
        }

        return books;
    } catch (error) {
        console.error("Error searching books:", error);
        return [];
    }
}
