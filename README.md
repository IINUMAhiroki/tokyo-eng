# カレンダーアプリケーション

Google Calendarライクな日程調整アプリケーション

## 技術スタック

- フロントエンド: React + TypeScript
- バックエンド: Go (Gin)
- データベース: MySQL

## セットアップ

### 必要条件

- Docker
- Docker Compose

### 起動方法

```bash
# アプリケーションの起動
docker-compose up --build

# アクセス
フロントエンド: http://localhost:3000
バックエンドAPI: http://localhost:8080
データベース: localhost:3307
```

## 機能

- カレンダー表示
- 日程候補の選択（最大3つ）
- 予定の作成と保存

## 開発者

[あなたの名前]
