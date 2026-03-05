# BookShelf

## プロジェクト概要
BookShelfは、招待制の書籍口コミ・本棚管理Webアプリケーションです。国立国会図書館のデータベースを活用して書籍を検索し、独自のレビュー投稿や本棚を通じたユーザー間の共有機能を提供します。

## 主要機能
- **書籍検索**: NDLサーチ機能を利用した正確な書籍検索機能
- **レビュー機能**: 書籍に対する5段階評価およびコメントによる口コミ機能
- **イイネ機能**: お気に入りの書籍やレビューに対するイイネ機能
- **本棚機能**: ユーザー独自の「本棚」を作成し、書籍を管理・公開する機能
- **招待制ユーザー管理**: 完全招待制によるセキュアでクローズドなユーザー登録・管理システム

## 技術スタック
- **フロントエンド**: Next.js (App Router) / TypeScript / Tailwind CSS
- **バックエンド / DB**: Supabase (PostgreSQL + Realtime)
- **デプロイ**: Vercel
- **パッケージマネージャー**: npm

## 画面構成
1. **検索画面**: 書籍の検索と一覧表示
2. **書籍詳細画面**: 書籍情報、書影、およびレビュー情報の表示
3. **みんなの本棚画面**: 公開されている他のユーザーの本棚一覧
4. **マイページ**: 自身の本棚、レビュー履歴、プロフィール管理
5. **ログイン / 登録画面**: 招待コードを利用した新規登録と認証
6. **管理者画面**: 招待コードの発行、ユーザー管理

## データ構造 (Supabase PostgreSQL)
- `users`: ID, ユーザー名、メールアドレス、パスワードハッシュ、ロール、利用済招待コード情報など
- `books`: ID, ISBN, タイトル、著者、出版社、出版年、書影URL
- `reviews`: ID, ユーザーID, 書籍ID, 評価 (Rating)、コメント
- `likes`: ID, ユーザーID, 書籍ID
- `shelves`: ID, ユーザーID, 本棚名、公開設定フラグ
- `shelf_books`: ID, 本棚ID, 書籍ID
- `shelf_tags`: ID, 本棚ID, タグID
- `tags`: ID, タグ名
- `invite_codes`: ID, 招待コード文字列、使用状況フラグ、作成者情報

## 使用する外部API
- **NDLサーチ OpenSearch API**: 書籍メタデータの取得・検索
- **NDLサーチ書影API**: 書籍の表紙画像の取得
- **openBD API**: 書誌情報および書影情報の取得（補完用途）

## セットアップ手順
ローカル環境でプロジェクトを起動するための手順です。

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd bookshelf
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   プロジェクトルートに `.env.local` ファイルを作成し、下記の環境変数を設定します（詳細は後述）。

4. **ローカルサーバーの起動**
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:3000` にアクセスして動作を確認します。

## 環境変数一覧
以下の内容を `.env.local` に記述して使用してください。
Supabaseの各種キーは、Supabaseダッシュボード（Project Settings > API）から取得可能です。

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Service Role Key (※バックエンド処理や管理者権限用。クライアントには露出させないこと)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 開発用設定
NODE_ENV=development
```
