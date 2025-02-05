FROM node:18

WORKDIR /app

# package.jsonとpackage-lock.jsonを先にコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# その他のファイルをコピー
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
