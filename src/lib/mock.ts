// Add the mocked data to use temporarily
import { BookEntry } from "@/lib/api/ndl";

export const TAGS = ["ミステリー", "SF", "ビジネス", "自己啓発", "小説", "技術書", "歴史", "エッセイ", "泣ける", "初心者向け"];

export const MOCK_BOOKS: BookEntry[] = [
    { id: "1", title: "人間失格", author: "太宰治", publisher: "新潮社", isbn: "9784101006017", published_year: "1948", thumbnail_url: "https://ndlsearch.ndl.go.jp/thumbnail/9784101006017.jpg" },
    { id: "2", title: "ノルウェイの森", author: "村上春樹", publisher: "講談社", isbn: "9784062748681", published_year: "1987", thumbnail_url: "https://ndlsearch.ndl.go.jp/thumbnail/9784062748681.jpg" },
    { id: "3", title: "コンビニ人間", author: "村田沙耶香", publisher: "文藝春秋", isbn: "9784167911300", published_year: "2016", thumbnail_url: "https://ndlsearch.ndl.go.jp/thumbnail/9784167911300.jpg" },
    { id: "4", title: "火花", author: "又吉直樹", publisher: "文藝春秋", isbn: "9784167906818", published_year: "2015", thumbnail_url: "https://ndlsearch.ndl.go.jp/thumbnail/9784167906818.jpg" },
    { id: "5", title: "蜜蜂と遠雷", author: "恩田陸", publisher: "幻冬舎", isbn: "9784344030039", published_year: "2016", thumbnail_url: "https://ndlsearch.ndl.go.jp/thumbnail/9784344030039.jpg" },
    { id: "6", title: "容疑者Xの献身", author: "東野圭吾", publisher: "文藝春秋", isbn: "9784167110123", published_year: "2005", thumbnail_url: "https://ndlsearch.ndl.go.jp/thumbnail/9784167110123.jpg" },
];

export const MOCK_REVIEWS = [
    { id: 1, user: "読書好きA", rating: 5, text: "圧倒的な文章力に引き込まれました。何度読んでも新しい発見がある名作です。", date: "2025-02-15" },
    { id: 2, user: "本の虫B", rating: 4, text: "独特の世界観が魅力的。後半の展開が特に素晴らしかった。", date: "2025-02-10" },
    { id: 3, user: "週末読書C", rating: 4, text: "読みやすく、一気に読了。キャラクターの描写が丁寧で感情移入しやすい。", date: "2025-01-28" },
];

export const INIT_MY_SHELVES = [
    { id: 101, name: "心に残るミステリー", isPublic: true, tags: ["ミステリー"], books: [MOCK_BOOKS[5], MOCK_BOOKS[3]], updatedAt: "2025-02-20" },
    { id: 102, name: "今年読みたい本", isPublic: true, tags: ["小説", "ビジネス"], books: [MOCK_BOOKS[1], MOCK_BOOKS[4], MOCK_BOOKS[2]], updatedAt: "2025-02-18" },
    { id: 103, name: "積読リスト", isPublic: false, tags: ["技術書"], books: [MOCK_BOOKS[0], MOCK_BOOKS[3]], updatedAt: "2025-02-12" },
    { id: 104, name: "プレゼント候補", isPublic: false, tags: [], books: [MOCK_BOOKS[4]], updatedAt: "2025-01-30" },
];

export const MOCK_SHELVES_PUBLIC = [
    { id: 1, name: "心に残るミステリー", owner: "読書好きA", isPublic: true, tags: ["ミステリー"], books: [MOCK_BOOKS[5], MOCK_BOOKS[3]], updatedAt: "2025-02-20" },
    { id: 2, name: "泣ける名作セレクション", owner: "本の虫B", isPublic: true, tags: ["小説", "泣ける"], books: [MOCK_BOOKS[0], MOCK_BOOKS[1], MOCK_BOOKS[4]], updatedAt: "2025-02-18" },
    { id: 3, name: "仕事に役立つ一冊", owner: "週末読書C", isPublic: true, tags: ["ビジネス", "自己啓発"], books: [MOCK_BOOKS[2], MOCK_BOOKS[3]], updatedAt: "2025-02-15" },
    { id: 4, name: "SF好きの棚", owner: "宇宙人D", isPublic: true, tags: ["SF"], books: [MOCK_BOOKS[4]], updatedAt: "2025-02-10" },
];
