-- テーブル作成

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user' NOT NULL,
  invite_code_used TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  isbn TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  publisher TEXT,
  published_year TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, book_id)
);

CREATE TABLE shelves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE shelf_books (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shelf_id UUID REFERENCES shelves(id) ON DELETE CASCADE NOT NULL,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(shelf_id, book_id)
);

CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE shelf_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shelf_id UUID REFERENCES shelves(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(shelf_id, tag_id)
);

CREATE TABLE invite_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT false NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS（Row Level Security）の有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelves ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelf_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE shelf_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- 閲覧: 全員許可（一部非公開本棚を除く）のポリシー

CREATE POLICY "Public profiles are viewable by everyone." ON users FOR SELECT USING (true);
CREATE POLICY "Books are viewable by everyone." ON books FOR SELECT USING (true);
CREATE POLICY "Reviews are viewable by everyone." ON reviews FOR SELECT USING (true);
CREATE POLICY "Likes are viewable by everyone." ON likes FOR SELECT USING (true);
CREATE POLICY "Tags are viewable by everyone." ON tags FOR SELECT USING (true);

CREATE POLICY "Public shelves are viewable by everyone." ON shelves FOR SELECT 
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Shelf books are viewable if shelf is public or owned by user." ON shelf_books FOR SELECT 
  USING (EXISTS (SELECT 1 FROM shelves WHERE shelves.id = shelf_books.shelf_id AND (shelves.is_public = true OR shelves.user_id = auth.uid())));

CREATE POLICY "Shelf tags are viewable if shelf is public or owned by user." ON shelf_tags FOR SELECT 
  USING (EXISTS (SELECT 1 FROM shelves WHERE shelves.id = shelf_tags.shelf_id AND (shelves.is_public = true OR shelves.user_id = auth.uid())));

-- 書き込み: 認証済みユーザーのみのポリシー
-- ※カスタム認証の場合、auth.uid()が適切に設定されていることを前提としています。
-- （Supabase Authを使用している場合は auth.role() = 'authenticated'等になります）

CREATE POLICY "Users can insert their own profile." ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Authenticated users can insert books." ON books FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert reviews." ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews." ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews." ON reviews FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert likes." ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes." ON likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert shelves." ON shelves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own shelves." ON shelves FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own shelves." ON shelves FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage books in their own shelves." ON shelf_books FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM shelves WHERE shelves.id = shelf_books.shelf_id AND shelves.user_id = auth.uid()));
CREATE POLICY "Users can delete books in their own shelves." ON shelf_books FOR DELETE USING (EXISTS (SELECT 1 FROM shelves WHERE shelves.id = shelf_books.shelf_id AND shelves.user_id = auth.uid()));

CREATE POLICY "Users can manage tags in their own shelves." ON shelf_tags FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM shelves WHERE shelves.id = shelf_tags.shelf_id AND shelves.user_id = auth.uid()));
CREATE POLICY "Users can delete tags in their own shelves." ON shelf_tags FOR DELETE USING (EXISTS (SELECT 1 FROM shelves WHERE shelves.id = shelf_tags.shelf_id AND shelves.user_id = auth.uid()));

-- 管理者操作: roleが'admin'のユーザーのみ
-- adminチェック用関数を追加するか、Existsクエリで代用します

CREATE POLICY "Only admins can modify tags." ON tags FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

CREATE POLICY "Only admins can view invite codes." ON invite_codes FOR SELECT 
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

CREATE POLICY "Only admins can manage invite codes." ON invite_codes FOR ALL 
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

-- 初期データのパッチ投入
INSERT INTO tags (name) VALUES 
  ('ミステリー'), ('SF'), ('ビジネス'), ('自己啓発'), ('小説'), 
  ('技術書'), ('歴史'), ('エッセイ'), ('泣ける'), ('初心者向け')
ON CONFLICT (name) DO NOTHING;

INSERT INTO invite_codes (code) VALUES ('TEST-INVITE-CODE-2025')
ON CONFLICT (code) DO NOTHING;

-- Supabase Realtimeの有効化（ダッシュボード等での確認用）
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE users, books, reviews, likes, shelves, shelf_books, tags, shelf_tags, invite_codes;
