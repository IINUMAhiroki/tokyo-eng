FROM node:18

WORKDIR /app

# package.jsonとpackage-lock.jsonを先にコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# ソースコードをコピー
COPY public/ public/
COPY src/ src/
COPY tsconfig.json ./

# 開発サーバーの起動
EXPOSE 3001
ENV CI=true
CMD ["npm", "start"]
