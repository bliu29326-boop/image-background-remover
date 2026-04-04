# Google OAuth + D1 部署指南

## 1. 在 Cloudflare Dashboard 创建 D1 数据库

1. 登录 Cloudflare Dashboard
2. 进入 Workers & Pages > D1
3. 点击 "Create database"
4. 数据库名称填写: `auth_db`
5. 创建后复制 database_id
6. 更新 wrangler.toml 中的 `database_id`

## 2. 初始化数据库表

```bash
wrangler d1 execute auth_db --file=./schema.sql
```

## 3. 配置 Google OAuth 回调 URL

在 Google Cloud Console 添加授权回调 URL:
- 本地开发: `http://localhost:3000/api/auth/callback/google`
- 生产环境: `https://你的域名/api/auth/callback/google`

## 4. 设置 Cloudflare Pages 环境变量

在 Cloudflare Pages 项目设置中添加:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `AUTH_SECRET`（运行时优先使用）
- `NEXTAUTH_SECRET`（兼容保留，可与 `AUTH_SECRET` 保持一致）
- `NEXTAUTH_URL`
- `REMOVEBG_API_KEY`

注意：
- Cloudflare D1 在运行时通过 `DB` binding 注入，不是 `process.env.DB`。
- Pages 项目里要确保已绑定 D1：`DB -> auth_db`。

## 5. 本地开发

```bash
npm run dev
```

## 6. 部署到 Cloudflare Pages

```bash
npm run pages:build
wrangler pages deploy
```
