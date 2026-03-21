# MVP 需求文档 — Image Background Remover

## 1. 项目目标
提供一个网页工具，让用户上传图片，一键去除背景，并下载处理后的 PNG 图像。

---

## 2. 用户流程
1. 打开网站  
2. 上传图片（支持拖拽/点击上传）  
3. 点击“去背景”  
4. 显示处理结果  
5. 点击“下载 PNG”

---

## 3. 核心功能（MVP）
### 必须实现
- ✅ 图片上传（JPG/PNG）
- ✅ 调用 remove.bg API 去背景
- ✅ 展示结果图
- ✅ 下载结果图（PNG）
- ✅ 错误提示（API失败/图片格式不支持）

### 可选（非 MVP）
- 裁剪/缩放  
- 历史记录  
- 用户登录/存储

---

## 4. 技术方案
- 前端：Next.js + Tailwind  
- 后端：Next.js API Route（转发 remove.bg）  
- 存储：不落地（仅内存）  
- 部署：Cloudflare Pages

---

## 5. API 设计
### POST `/api/remove-bg`
**输入**：FormData，字段 `image_file`  
**输出**：返回 PNG 二进制流  

---

## 6. 页面结构
- Header（Logo + 标题）  
- 上传区（拖拽框 + 按钮）  
- 处理按钮  
- 结果展示区  
- 下载按钮  
- 错误提示区  
