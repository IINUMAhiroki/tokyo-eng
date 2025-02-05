FROM node:18

WORKDIR /app

# package.jsonとpackage-lock.jsonを先にコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# publicとsrcディレクトリをコピー
COPY public/ public/
COPY src/ src/
COPY tsconfig.json ./

EXPOSE 3000
CMD ["npm", "start"]
