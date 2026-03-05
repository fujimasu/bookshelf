---
name: bookshelf-developer
description: This skill provides the core development rules, tech stack, and database schema for the BookShelf application. Use this skill when generating code, reviewing PRs, or architecting features for the BookShelf project to ensure adherence to project standards.
---

# BookShelf Developer

## Goal
BookShelf（書籍口コミ・本棚管理サイト）の開発において、プロジェクトの技術スタック、コーディングルール、データベース設計に従った一貫性のあるコードやアーキテクチャを提供する。

## Instructions
コードの生成や修正を行う際は、以下のプロジェクト構成とルールに必ず従ってください：

### 1. 技術スタック
- フロントエンド: Next.js（App Router）+ TypeScript + Tailwind CSS
- バックエンド/DB: Supabase（PostgreSQL + Realtime）
- デプロイ: Vercel
- パッケージマネージャー: npm
- 外部API: NDLサーチ OpenSearch API, NDLサーチ書影API, openBD API

### 2. コーディングルール
- TypeScriptの型定義を必ず行うこと（`any`の使用は厳禁）。
- UIや機能コンポーネントは `src/components/` に配置すること。
- 環境変数は `.env.local` で管理し、クライアントに露出させるものには `NEXT_PUBLIC_` プレフィックスを使用すること。
- Supabaseクライアントの初期化や共通処理は `src/lib/supabase.ts` に集約すること。
- スタイリングは Tailwind CSS のみを使用すること。
- 外部API（NDLサーチ、openBDなど）の呼び出し処理は `src/lib/api/` に集約すること。

### 3. Supabase構成（データベース設計とRLS）
- **テーブル定義**:
  - `users`: id, username, email, password_hash, role, invite_code_used, created_at
  - `books`: id, isbn, title, author, publisher, published_year, thumbnail_url, created_at
  - `reviews`: id, user_id, book_id, rating, comment, created_at
  - `likes`: id, user_id, book_id, created_at
  - `shelves`: id, user_id, name, is_public, created_at, updated_at
  - `shelf_books`: id, shelf_id, book_id, created_at
  - `shelf_tags`: id, shelf_id, tag_id
  - `tags`: id, name, created_at
  - `invite_codes`: id, code, is_used, created_by, created_at
- **RLS (Row Level Security)**: 
  - ログインユーザーのみ書き込み可。
  - 閲覧は全員許可（一部非公開本棚のみ閲覧制限を設ける）。

### 4. デプロイ環境
- VercelプロジェクトとGitHubリポジトリを連携してデプロイする想定。
- 環境変数はVercelダッシュボードで設定する。

## Constraints
- TypeScriptで `any` 型を絶対に使用しないこと。
- インラインスタイル（`style={{...}}`）を使用せず、必ず Tailwind CSS のクラスでスタイリングすること。
- コンポーネント内に外部APIのフェッチ処理を直接ハードコードせず、必ず `src/lib/api/` の関数を使用すること。
- RLSの設計ポリシーを無視したデータベースクエリを生成しないこと。
