import { useState } from "react";

const TAGS = ["ミステリー", "SF", "ビジネス", "自己啓発", "小説", "技術書", "歴史", "エッセイ", "泣ける", "初心者向け"];

const MOCK_BOOKS = [
  { id: 1, title: "人間失格", author: "太宰治", publisher: "新潮社", isbn: "9784101006017", year: "1948", rating: 4.2, reviews: 28, likes: 45 },
  { id: 2, title: "ノルウェイの森", author: "村上春樹", publisher: "講談社", isbn: "9784062748681", year: "1987", rating: 4.5, reviews: 52, likes: 89 },
  { id: 3, title: "コンビニ人間", author: "村田沙耶香", publisher: "文藝春秋", isbn: "9784167911300", year: "2016", rating: 3.9, reviews: 34, likes: 56 },
  { id: 4, title: "火花", author: "又吉直樹", publisher: "文藝春秋", isbn: "9784167906818", year: "2015", rating: 3.7, reviews: 41, likes: 33 },
  { id: 5, title: "蜜蜂と遠雷", author: "恩田陸", publisher: "幻冬舎", isbn: "9784344030039", year: "2016", rating: 4.6, reviews: 63, likes: 102 },
  { id: 6, title: "容疑者Xの献身", author: "東野圭吾", publisher: "文藝春秋", isbn: "9784167110123", year: "2005", rating: 4.4, reviews: 71, likes: 95 },
];

const MOCK_SHELVES_PUBLIC = [
  { id: 1, name: "心に残るミステリー", owner: "読書好きA", isPublic: true, tags: ["ミステリー"], books: [MOCK_BOOKS[5], MOCK_BOOKS[3]], updatedAt: "2025-02-20" },
  { id: 2, name: "泣ける名作セレクション", owner: "本の虫B", isPublic: true, tags: ["小説", "泣ける"], books: [MOCK_BOOKS[0], MOCK_BOOKS[1], MOCK_BOOKS[4]], updatedAt: "2025-02-18" },
  { id: 3, name: "仕事に役立つ一冊", owner: "週末読書C", isPublic: true, tags: ["ビジネス", "自己啓発"], books: [MOCK_BOOKS[2], MOCK_BOOKS[3]], updatedAt: "2025-02-15" },
  { id: 4, name: "SF好きの棚", owner: "宇宙人D", isPublic: true, tags: ["SF"], books: [MOCK_BOOKS[4]], updatedAt: "2025-02-10" },
];

const INIT_MY_SHELVES = [
  { id: 101, name: "心に残るミステリー", isPublic: true, tags: ["ミステリー"], books: [MOCK_BOOKS[5], MOCK_BOOKS[3]], updatedAt: "2025-02-20" },
  { id: 102, name: "今年読みたい本", isPublic: true, tags: ["小説", "ビジネス"], books: [MOCK_BOOKS[1], MOCK_BOOKS[4], MOCK_BOOKS[2]], updatedAt: "2025-02-18" },
  { id: 103, name: "積読リスト", isPublic: false, tags: ["技術書"], books: [MOCK_BOOKS[0], MOCK_BOOKS[3]], updatedAt: "2025-02-12" },
  { id: 104, name: "プレゼント候補", isPublic: false, tags: [], books: [MOCK_BOOKS[4]], updatedAt: "2025-01-30" },
];

const MOCK_REVIEWS = [
  { id: 1, user: "読書好きA", rating: 5, text: "圧倒的な文章力に引き込まれました。何度読んでも新しい発見がある名作です。", date: "2025-02-15" },
  { id: 2, user: "本の虫B", rating: 4, text: "独特の世界観が魅力的。後半の展開が特に素晴らしかった。", date: "2025-02-10" },
  { id: 3, user: "週末読書C", rating: 4, text: "読みやすく、一気に読了。キャラクターの描写が丁寧で感情移入しやすい。", date: "2025-01-28" },
];

const Stars = ({ rating, size = 16 }) => (
  <span style={{ display: "inline-flex", gap: 1 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ color: i <= Math.round(rating) ? "#E8A838" : "#D5D1C8", fontSize: size, lineHeight: 1 }}>★</span>
    ))}
  </span>
);

const BookCover = ({ title, index = 0, size = "md" }) => {
  const palettes = [
    { bg: "#2C4A52", accent: "#E8A838", text: "#F5F0E8" },
    { bg: "#8B2F3A", accent: "#D4A574", text: "#F5F0E8" },
    { bg: "#3A5A40", accent: "#A3B18A", text: "#F5F0E8" },
    { bg: "#4A3728", accent: "#C4956A", text: "#F5F0E8" },
    { bg: "#2E3A59", accent: "#7B9ACC", text: "#F5F0E8" },
    { bg: "#5C374C", accent: "#CE8DA2", text: "#F5F0E8" },
  ];
  const p = palettes[index % palettes.length];
  const dims = size === "lg" ? { w: 180, h: 260 } : size === "sm" ? { w: 80, h: 115 } : { w: 120, h: 172 };
  return (
    <div style={{
      width: dims.w, height: dims.h, background: p.bg, borderRadius: 4,
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      padding: 12, position: "relative", overflow: "hidden", flexShrink: 0,
      boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.accent }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, height: 1, background: p.accent, opacity: 0.3 }} />
      <span style={{
        color: p.text, fontFamily: "'Noto Serif JP', serif", fontWeight: 700,
        fontSize: size === "lg" ? 16 : size === "sm" ? 10 : 12,
        textAlign: "center", lineHeight: 1.5, letterSpacing: 1,
        writingMode: dims.h > 200 ? "vertical-rl" : "horizontal-tb",
      }}>{title}</span>
    </div>
  );
};

const Badge = ({ children, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
    background: active ? "#2C4A52" : "#E8E4DC", color: active ? "#F5F0E8" : "#5A5347",
    fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13, fontWeight: 500,
    transition: "all 0.2s",
  }}>{children}</button>
);

const VisibilityBadge = ({ isPublic }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
    background: isPublic ? "#E6F0F2" : "#F3EDE4",
    color: isPublic ? "#2C6E7A" : "#8A7A63",
    border: `1px solid ${isPublic ? "#C4DDE2" : "#DDD4C4"}`,
  }}>
    <span style={{ fontSize: 12 }}>{isPublic ? "\uD83C\uDF10" : "\uD83D\uDD12"}</span>
    {isPublic ? "公開" : "非公開"}
  </span>
);

// ===== SCREENS =====

const SearchScreen = ({ onBookClick }) => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, color: "#2C4A52", margin: 0 }}>書籍をさがす</h2>
        <p style={{ color: "#8A8477", fontSize: 14, marginTop: 8 }}>国立国会図書館の蔵書から検索できます</p>
      </div>
      <div style={{ display: "flex", gap: 8, maxWidth: 600, margin: "0 auto 32px" }}>
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="タイトル、著者名、ISBNで検索..."
          style={{
            flex: 1, padding: "12px 16px", border: "2px solid #D5D1C8", borderRadius: 8,
            fontSize: 15, fontFamily: "'Noto Sans JP', sans-serif", outline: "none",
            background: "#FDFCFA", transition: "border 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "#2C4A52"}
          onBlur={e => e.target.style.borderColor = "#D5D1C8"}
        />
        <button style={{
          padding: "12px 24px", background: "#2C4A52", color: "#F5F0E8", border: "none",
          borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>検索</button>
      </div>
      <p style={{ color: "#8A8477", fontSize: 13, marginBottom: 16 }}>検索結果：{MOCK_BOOKS.length}件</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {MOCK_BOOKS.map((book, i) => (
          <div key={book.id} onClick={() => onBookClick(book, i)}
            style={{
              display: "flex", gap: 16, padding: 16, background: "#FDFCFA",
              borderRadius: 10, border: "1px solid #E8E4DC", cursor: "pointer",
              transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "#C4B9A8"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#E8E4DC"; }}
          >
            <BookCover title={book.title} index={i} size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontFamily: "'Noto Serif JP', serif", color: "#2C4A52" }}>{book.title}</h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8A8477" }}>{book.author} / {book.publisher} / {book.year}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Stars rating={book.rating} size={14} />
                  <span style={{ fontSize: 13, color: "#5A5347", fontWeight: 600 }}>{book.rating}</span>
                </span>
                <span style={{ fontSize: 12, color: "#8A8477" }}>レビュー {book.reviews}件</span>
                <span style={{ fontSize: 12, color: "#8A8477" }}>♥ {book.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookDetailScreen = ({ book, bookIndex, onBack, myShelves, setMyShelves }) => {
  const [myRating, setMyRating] = useState(0);
  const [liked, setLiked] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [shelfMenuOpen, setShelfMenuOpen] = useState(false);
  const b = book || MOCK_BOOKS[0];
  const idx = bookIndex ?? 0;
  const inShelves = myShelves.filter(s => s.books.some(bk => bk.id === b.id));

  return (
    <div>
      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#8A8477", cursor: "pointer",
        fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", marginBottom: 16, padding: 0,
      }}>{"\u2190"} 検索結果に戻る</button>
      <div style={{ display: "flex", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
        <BookCover title={b.title} index={idx} size="lg" />
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2 style={{ margin: 0, fontFamily: "'Noto Serif JP', serif", fontSize: 26, color: "#2C4A52" }}>{b.title}</h2>
          <p style={{ margin: "8px 0 0", color: "#5A5347", fontSize: 15 }}>{b.author}</p>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: "#8A8477" }}>
            <span>出版社：{b.publisher}</span>
            <span>ISBN：{b.isbn}</span>
            <span>出版年：{b.year}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
            <Stars rating={b.rating} size={22} />
            <span style={{ fontSize: 22, fontWeight: 700, color: "#2C4A52" }}>{b.rating}</span>
            <span style={{ fontSize: 13, color: "#8A8477" }}>（{b.reviews}件のレビュー）</span>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            <button onClick={() => setLiked(!liked)} style={{
              padding: "10px 20px", borderRadius: 8, border: liked ? "2px solid #E8A838" : "2px solid #D5D1C8",
              background: liked ? "#FDF5E6" : "#FDFCFA", cursor: "pointer",
              fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", color: liked ? "#C4880C" : "#5A5347",
              fontWeight: 600, transition: "all 0.2s",
            }}>{"\u2665"} イイネ {liked ? b.likes + 1 : b.likes}</button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShelfMenuOpen(!shelfMenuOpen)} style={{
                padding: "10px 20px", borderRadius: 8, border: inShelves.length > 0 ? "2px solid #3A5A40" : "2px solid #D5D1C8",
                background: inShelves.length > 0 ? "#EDF5EE" : "#FDFCFA", cursor: "pointer",
                fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", color: inShelves.length > 0 ? "#3A5A40" : "#5A5347",
                fontWeight: 600, transition: "all 0.2s",
              }}>{"\uD83D\uDCDA"} 本棚に追加 {"\u25BE"}</button>
              {shelfMenuOpen && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, marginTop: 6,
                  background: "#fff", border: "1px solid #E8E4DC", borderRadius: 10,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)", padding: 8, minWidth: 260, zIndex: 10,
                }}>
                  <div style={{ padding: "6px 10px", fontSize: 12, color: "#8A8477", fontWeight: 600, borderBottom: "1px solid #E8E4DC", marginBottom: 4 }}>
                    追加する本棚を選択
                  </div>
                  {myShelves.map(shelf => {
                    const isIn = shelf.books.some(bk => bk.id === b.id);
                    return (
                      <div key={shelf.id}
                        onClick={() => {
                          if (isIn) {
                            setMyShelves(myShelves.map(s => s.id === shelf.id ? { ...s, books: s.books.filter(bk => bk.id !== b.id) } : s));
                          } else {
                            setMyShelves(myShelves.map(s => s.id === shelf.id ? { ...s, books: [...s.books, b] } : s));
                          }
                        }}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "8px 10px", borderRadius: 6, cursor: "pointer",
                          background: isIn ? "#EDF5EE" : "transparent", transition: "background 0.15s",
                        }}
                        onMouseEnter={e => { if (!isIn) e.currentTarget.style.background = "#F5F3EF"; }}
                        onMouseLeave={e => { if (!isIn) e.currentTarget.style.background = isIn ? "#EDF5EE" : "transparent"; }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{isIn ? "\u2713" : "\u25CB"}</span>
                          <span style={{ fontSize: 14, color: "#2C4A52", fontWeight: isIn ? 600 : 400 }}>{shelf.name}</span>
                        </div>
                        <VisibilityBadge isPublic={shelf.isPublic} />
                      </div>
                    );
                  })}
                  <div style={{ borderTop: "1px solid #E8E4DC", marginTop: 4, paddingTop: 4 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                      borderRadius: 6, cursor: "pointer", color: "#2C4A52", fontSize: 14, fontWeight: 600,
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "#F5F3EF"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{"\uFF0B"}</span>
                      <span>新しい本棚を作成...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {inShelves.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
              {inShelves.map(s => (
                <span key={s.id} style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "4px 10px", background: "#EDF5EE", borderRadius: 12,
                  fontSize: 12, color: "#3A5A40", fontWeight: 500,
                }}>{"\uD83D\uDCDA"} {s.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Form */}
      <div style={{ background: "#FDFCFA", borderRadius: 12, border: "1px solid #E8E4DC", padding: 24, marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontFamily: "'Noto Serif JP', serif", fontSize: 18, color: "#2C4A52" }}>レビューを投稿</h3>
        <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <span key={i} onClick={() => setMyRating(i)}
              style={{ cursor: "pointer", fontSize: 28, color: i <= myRating ? "#E8A838" : "#D5D1C8", transition: "color 0.15s" }}>{"\u2605"}</span>
          ))}
          {myRating > 0 && <span style={{ fontSize: 13, color: "#8A8477", alignSelf: "center", marginLeft: 8 }}>{myRating}.0</span>}
        </div>
        <textarea value={reviewText} onChange={e => setReviewText(e.target.value)}
          placeholder="この本の感想を書いてください..."
          style={{
            width: "100%", minHeight: 80, padding: 12, border: "2px solid #E8E4DC", borderRadius: 8,
            fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", resize: "vertical",
            outline: "none", background: "#fff", boxSizing: "border-box",
          }} />
        <button style={{
          marginTop: 10, padding: "10px 28px", background: "#2C4A52", color: "#F5F0E8",
          border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>投稿する</button>
      </div>

      {/* Reviews */}
      <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 18, color: "#2C4A52", marginBottom: 16 }}>レビュー一覧</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MOCK_REVIEWS.map(r => (
          <div key={r.id} style={{ padding: 16, background: "#FDFCFA", borderRadius: 10, border: "1px solid #E8E4DC" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: "#D5D1C8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "#5A5347", fontWeight: 600,
                }}>{r.user[0]}</div>
                <span style={{ fontWeight: 600, fontSize: 14, color: "#2C4A52" }}>{r.user}</span>
              </div>
              <span style={{ fontSize: 12, color: "#8A8477" }}>{r.date}</span>
            </div>
            <Stars rating={r.rating} size={14} />
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "#5A5347", lineHeight: 1.7 }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PublicShelvesScreen = () => {
  const [activeTag, setActiveTag] = useState(null);
  const filtered = activeTag ? MOCK_SHELVES_PUBLIC.filter(s => s.tags.includes(activeTag)) : MOCK_SHELVES_PUBLIC;
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, color: "#2C4A52", margin: 0 }}>みんなの本棚</h2>
        <p style={{ color: "#8A8477", fontSize: 14, marginTop: 8 }}>公開されている本棚を覗いてみよう</p>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28, justifyContent: "center" }}>
        <Badge active={!activeTag} onClick={() => setActiveTag(null)}>すべて</Badge>
        {TAGS.slice(0, 7).map(tag => (
          <Badge key={tag} active={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}>{tag}</Badge>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#8A8477" }}>
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>{"\uD83D\uDCDA"}</p>
          <p>このタグの本棚はまだありません</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {filtered.map(shelf => (
            <div key={shelf.id} style={{
              background: "#FDFCFA", borderRadius: 12, border: "1px solid #E8E4DC", padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>{"\uD83D\uDCDA"}</span>
                    <h3 style={{ margin: 0, fontSize: 17, fontFamily: "'Noto Serif JP', serif", color: "#2C4A52" }}>{shelf.name}</h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8A8477" }}>
                    <span>{shelf.owner}</span>
                    <span>{"\u00B7"}</span>
                    <span>{shelf.books.length}冊</span>
                    <span>{"\u00B7"}</span>
                    <span>更新 {shelf.updatedAt}</span>
                  </div>
                </div>
              </div>
              {shelf.tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {shelf.tags.map(tag => (
                    <span key={tag} style={{
                      padding: "3px 10px", background: "#EEEBE5", borderRadius: 12,
                      fontSize: 12, color: "#6B6459",
                    }}>{tag}</span>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
                {shelf.books.map(book => (
                  <div key={book.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 88 }}>
                    <BookCover title={book.title} index={book.id - 1} size="sm" />
                    <span style={{ fontSize: 11, color: "#5A5347", textAlign: "center", maxWidth: 82, lineHeight: 1.3 }}>{book.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MyPageScreen = ({ myShelves, setMyShelves }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPublic, setNewPublic] = useState(true);
  const [newTags, setNewTags] = useState([]);

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

  const toggleVisibility = (id) => {
    setMyShelves(myShelves.map(s => s.id === id ? { ...s, isPublic: !s.isPublic } : s));
  };

  const deleteShelf = (id) => {
    setMyShelves(myShelves.filter(s => s.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "#2C4A52",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, color: "#F5F0E8", fontWeight: 700,
        }}>読</div>
        <div>
          <h2 style={{ margin: 0, fontFamily: "'Noto Serif JP', serif", fontSize: 22, color: "#2C4A52" }}>読書好きA</h2>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#8A8477" }}>
            本棚 {myShelves.length}個（公開 {myShelves.filter(s => s.isPublic).length} / 非公開 {myShelves.filter(s => !s.isPublic).length}）{"\u00A0\u00B7\u00A0"}レビュー {myReviews.length}件
          </p>
        </div>
      </div>

      {/* My Shelves Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 18, color: "#2C4A52", margin: 0 }}>マイ本棚</h3>
        <button onClick={() => setShowCreateModal(true)} style={{
          padding: "8px 18px", background: "#2C4A52", color: "#F5F0E8", border: "none",
          borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Noto Sans JP', sans-serif", display: "flex", alignItems: "center", gap: 6,
        }}>
          <span>{"\uFF0B"}</span> 新しい本棚
        </button>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div style={{
          background: "#FDFCFA", borderRadius: 12, border: "2px solid #2C4A52",
          padding: 24, marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}>
          <h4 style={{ margin: "0 0 16px", fontSize: 16, color: "#2C4A52", fontFamily: "'Noto Serif JP', serif" }}>新しい本棚を作成</h4>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 6, fontWeight: 600 }}>本棚の名前</label>
            <input value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="例：今年読みたいミステリー" style={{
                width: "100%", padding: "10px 12px", border: "2px solid #E8E4DC", borderRadius: 8,
                fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", outline: "none", boxSizing: "border-box",
              }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 8, fontWeight: 600 }}>公開設定</label>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setNewPublic(true)} style={{
                flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer",
                border: newPublic ? "2px solid #2C6E7A" : "2px solid #E8E4DC",
                background: newPublic ? "#E6F0F2" : "#fff",
                color: newPublic ? "#2C6E7A" : "#8A8477",
                fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 600,
              }}>{"\uD83C\uDF10"} 公開</button>
              <button onClick={() => setNewPublic(false)} style={{
                flex: 1, padding: "10px", borderRadius: 8, cursor: "pointer",
                border: !newPublic ? "2px solid #8A7A63" : "2px solid #E8E4DC",
                background: !newPublic ? "#F3EDE4" : "#fff",
                color: !newPublic ? "#8A7A63" : "#8A8477",
                fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 600,
              }}>{"\uD83D\uDD12"} 非公開</button>
            </div>
            <p style={{ fontSize: 12, color: "#8A8477", margin: "6px 0 0" }}>
              {newPublic ? "「みんなの本棚」に表示され、他のユーザーが閲覧できます" : "自分だけが見られるプライベートな本棚になります"}
            </p>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 8, fontWeight: 600 }}>タグ（任意・複数選択可）</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {TAGS.map(tag => (
                <Badge key={tag} active={newTags.includes(tag)}
                  onClick={() => setNewTags(newTags.includes(tag) ? newTags.filter(t => t !== tag) : [...newTags, tag])}
                >{tag}</Badge>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => { setShowCreateModal(false); setNewName(""); setNewTags([]); }} style={{
              padding: "10px 20px", border: "2px solid #D5D1C8", borderRadius: 8, background: "#fff",
              fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#5A5347",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}>キャンセル</button>
            <button onClick={handleCreate} style={{
              padding: "10px 24px", background: "#2C4A52", color: "#F5F0E8", border: "none",
              borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Noto Sans JP', sans-serif", opacity: newName.trim() ? 1 : 0.5,
            }}>作成する</button>
          </div>
        </div>
      )}

      {/* Shelf List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
        {myShelves.map(shelf => (
          <div key={shelf.id} style={{
            background: "#FDFCFA", borderRadius: 12, border: "1px solid #E8E4DC", padding: 20,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 18 }}>{"\uD83D\uDCDA"}</span>
                  <h4 style={{ margin: 0, fontSize: 16, fontFamily: "'Noto Serif JP', serif", color: "#2C4A52" }}>{shelf.name}</h4>
                </div>
                <span style={{ fontSize: 13, color: "#8A8477" }}>{shelf.books.length}冊{"\u00A0\u00B7\u00A0"}更新 {shelf.updatedAt}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => toggleVisibility(shelf.id)} style={{
                  padding: "5px 12px", borderRadius: 8, border: "1px solid #E8E4DC",
                  background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600,
                  fontFamily: "'Noto Sans JP', sans-serif",
                  color: shelf.isPublic ? "#2C6E7A" : "#8A7A63",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {shelf.isPublic ? "\uD83C\uDF10 公開中" : "\uD83D\uDD12 非公開"}
                </button>
                <button onClick={() => deleteShelf(shelf.id)} style={{
                  padding: "5px 10px", borderRadius: 8, border: "1px solid #E8E4DC",
                  background: "#fff", cursor: "pointer", fontSize: 12, color: "#C0392B",
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}>削除</button>
              </div>
            </div>
            {shelf.tags.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {shelf.tags.map(tag => (
                  <span key={tag} style={{
                    padding: "3px 10px", background: "#EEEBE5", borderRadius: 12,
                    fontSize: 12, color: "#6B6459",
                  }}>{tag}</span>
                ))}
              </div>
            )}
            {shelf.books.length > 0 ? (
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
                {shelf.books.map(book => (
                  <div key={book.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 88 }}>
                    <BookCover title={book.title} index={book.id - 1} size="sm" />
                    <span style={{ fontSize: 11, color: "#5A5347", textAlign: "center", maxWidth: 82, lineHeight: 1.3 }}>{book.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: "#8A8477", textAlign: "center", padding: "12px 0" }}>
                まだ本がありません {"\u2014"} 検索画面から追加できます
              </p>
            )}
          </div>
        ))}
      </div>

      {/* My Reviews */}
      <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 18, color: "#2C4A52", marginBottom: 16 }}>投稿したレビュー</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {myReviews.map((r, i) => (
          <div key={i} style={{
            display: "flex", gap: 16, padding: 16, background: "#FDFCFA",
            borderRadius: 10, border: "1px solid #E8E4DC",
          }}>
            <BookCover title={r.book.title} index={r.book.id - 1} size="sm" />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: 15, color: "#2C4A52", fontFamily: "'Noto Serif JP', serif" }}>{r.book.title}</h4>
              <div style={{ margin: "4px 0 6px" }}><Stars rating={r.rating} size={13} /></div>
              <p style={{ margin: 0, fontSize: 14, color: "#5A5347", lineHeight: 1.6 }}>{r.text}</p>
              <span style={{ fontSize: 12, color: "#8A8477", marginTop: 6, display: "block" }}>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoginScreen = () => {
  const [mode, setMode] = useState("login");
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, color: "#2C4A52", margin: 0 }}>
          {mode === "login" ? "ログイン" : "新規登録"}
        </h2>
      </div>
      <div style={{ background: "#FDFCFA", borderRadius: 12, border: "1px solid #E8E4DC", padding: 28 }}>
        {mode === "register" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 6, fontWeight: 600 }}>招待コード</label>
            <input placeholder="招待コードを入力" style={{
              width: "100%", padding: "10px 12px", border: "2px solid #E8E4DC", borderRadius: 8,
              fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", outline: "none", boxSizing: "border-box",
            }} />
          </div>
        )}
        {mode === "register" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 6, fontWeight: 600 }}>ユーザー名</label>
            <input placeholder="表示名" style={{
              width: "100%", padding: "10px 12px", border: "2px solid #E8E4DC", borderRadius: 8,
              fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", outline: "none", boxSizing: "border-box",
            }} />
          </div>
        )}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 6, fontWeight: 600 }}>メールアドレス</label>
          <input type="email" placeholder="mail@example.com" style={{
            width: "100%", padding: "10px 12px", border: "2px solid #E8E4DC", borderRadius: 8,
            fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", outline: "none", boxSizing: "border-box",
          }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, color: "#5A5347", marginBottom: 6, fontWeight: 600 }}>パスワード</label>
          <input type="password" placeholder="••••••••" style={{
            width: "100%", padding: "10px 12px", border: "2px solid #E8E4DC", borderRadius: 8,
            fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", outline: "none", boxSizing: "border-box",
          }} />
        </div>
        <button style={{
          width: "100%", padding: "12px", background: "#2C4A52", color: "#F5F0E8",
          border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>{mode === "login" ? "ログイン" : "登録する"}</button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#8A8477" }}>
          {mode === "login" ? (
            <span>アカウントをお持ちでない方は <span onClick={() => setMode("register")} style={{ color: "#2C4A52", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>新規登録</span></span>
          ) : (
            <span>すでにアカウントをお持ちの方は <span onClick={() => setMode("login")} style={{ color: "#2C4A52", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>ログイン</span></span>
          )}
        </p>
      </div>
    </div>
  );
};

const AdminScreen = () => {
  const codes = [
    { code: "BOOK-2025-A1B2", status: "有効", created: "2025-02-01", used: false },
    { code: "BOOK-2025-C3D4", status: "使用済", created: "2025-01-15", used: true },
    { code: "BOOK-2025-E5F6", status: "有効", created: "2025-02-20", used: false },
  ];
  return (
    <div>
      <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 24, color: "#2C4A52", marginBottom: 24 }}>管理者画面</h2>
      <div style={{ background: "#FDFCFA", borderRadius: 12, border: "1px solid #E8E4DC", padding: 24, marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 17, color: "#2C4A52", fontFamily: "'Noto Serif JP', serif" }}>招待コード管理</h3>
        <button style={{
          padding: "8px 20px", background: "#2C4A52", color: "#F5F0E8", border: "none",
          borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>{"\uFF0B"} 新規発行</button>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {codes.map(c => (
            <div key={c.code} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", background: c.used ? "#F5F3EF" : "#fff", borderRadius: 8,
              border: "1px solid #E8E4DC", fontSize: 14,
            }}>
              <code style={{ fontFamily: "monospace", color: "#2C4A52", fontWeight: 600 }}>{c.code}</code>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#8A8477" }}>{c.created}</span>
                <span style={{
                  padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                  background: c.used ? "#E8E4DC" : "#EDF5EE", color: c.used ? "#8A8477" : "#3A5A40",
                }}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#FDFCFA", borderRadius: 12, border: "1px solid #E8E4DC", padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 17, color: "#2C4A52", fontFamily: "'Noto Serif JP', serif" }}>タグマスタ管理</h3>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <input placeholder="新しいタグ名" style={{
            flex: 1, padding: "8px 12px", border: "2px solid #E8E4DC", borderRadius: 8,
            fontSize: 14, fontFamily: "'Noto Sans JP', sans-serif", outline: "none",
          }} />
          <button style={{
            padding: "8px 20px", background: "#2C4A52", color: "#F5F0E8", border: "none",
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>追加</button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TAGS.map(tag => (
            <span key={tag} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px", background: "#E8E4DC", borderRadius: 20,
              fontSize: 13, color: "#5A5347",
            }}>
              {tag}
              <span style={{ cursor: "pointer", color: "#8A8477", fontWeight: 700 }}>{"\u00D7"}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== MAIN APP =====
export default function App() {
  const [screen, setScreen] = useState("search");
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [loggedIn, setLoggedIn] = useState(true);
  const [myShelves, setMyShelves] = useState(INIT_MY_SHELVES);

  const nav = [
    { id: "search", label: "検索", icon: "\uD83D\uDD0D" },
    { id: "shelves", label: "みんなの本棚", icon: "\uD83D\uDCDA" },
    { id: "mypage", label: "マイページ", icon: "\uD83D\uDC64" },
    { id: "admin", label: "管理", icon: "\u2699\uFE0F" },
    { id: "login", label: loggedIn ? "ログアウト" : "ログイン", icon: "\uD83D\uDD11" },
  ];

  const handleBookClick = (book, index) => {
    setSelectedBook(book);
    setSelectedBookIndex(index);
    setScreen("detail");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", fontFamily: "'Noto Sans JP', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Serif+JP:wght@500;700&display=swap" rel="stylesheet" />

      <header style={{
        background: "#2C4A52", padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>
        <div onClick={() => { setScreen("search"); setSelectedBook(null); }}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <span style={{ fontSize: 22 }}>{"\uD83D\uDCD6"}</span>
          <span style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 700, fontSize: 18, color: "#F5F0E8", letterSpacing: 1 }}>BookShelf</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {nav.map(n => (
            <button key={n.id}
              onClick={() => {
                if (n.id === "login") { setLoggedIn(!loggedIn); return; }
                setScreen(n.id); setSelectedBook(null);
              }}
              style={{
                padding: "8px 14px", border: "none", borderRadius: 6, cursor: "pointer",
                background: screen === n.id || (screen === "detail" && n.id === "search") ? "rgba(255,255,255,0.15)" : "transparent",
                color: "#F5F0E8", fontSize: 13, fontFamily: "'Noto Sans JP', sans-serif",
                fontWeight: screen === n.id ? 600 : 400, transition: "background 0.2s",
                display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <span style={{ fontSize: 14 }}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <div style={{
        background: loggedIn ? "#EDF5EE" : "#FDF5E6", padding: "6px 16px",
        textAlign: "center", fontSize: 12, color: loggedIn ? "#3A5A40" : "#C4880C",
        fontWeight: 500, borderBottom: "1px solid #E8E4DC",
      }}>
        {loggedIn ? "\u2713 ログイン中：読書好きA" : "未ログイン \u2014 閲覧のみ可能です"}
      </div>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
        {screen === "search" && <SearchScreen onBookClick={handleBookClick} />}
        {screen === "detail" && <BookDetailScreen book={selectedBook} bookIndex={selectedBookIndex} onBack={() => setScreen("search")} myShelves={myShelves} setMyShelves={setMyShelves} />}
        {screen === "shelves" && <PublicShelvesScreen />}
        {screen === "mypage" && (loggedIn ? <MyPageScreen myShelves={myShelves} setMyShelves={setMyShelves} /> : <LoginScreen />)}
        {screen === "admin" && (loggedIn ? <AdminScreen /> : <LoginScreen />)}
        {screen === "login" && <LoginScreen />}
      </main>

      <footer style={{
        padding: "20px 24px", textAlign: "center", borderTop: "1px solid #E8E4DC",
        fontSize: 12, color: "#8A8477", background: "#F5F2EC",
      }}>
        書籍情報は国立国会図書館サーチAPIから取得しています{"\u00A0\u00B7\u00A0"}非営利目的で運用
      </footer>
    </div>
  );
}
