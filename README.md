# spider 的博客

一个使用 [Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari) 构建的静态博客，主题色为淡粉紫（hue 315），部署目标为 Cloudflare Pages。

## 技术栈

- Astro 5 静态生成 + 内容集合
- Svelte 5 交互组件、Tailwind CSS
- Pagefind 全文搜索（构建时生成索引）
- Giscus 评论（基于 GitHub Discussions，已启用）
- Expressive Code 代码块、KaTeX 公式、PhotoSwipe 图片预览

## 本地开发

要求 Node.js >= 20、pnpm 9（项目通过 `packageManager` 锁定版本，并用 `only-allow` 强制使用 pnpm）。

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:4321
```

搜索索引在构建时生成，`pnpm dev` 下搜索结果是占位演示。要验收真实搜索，请使用：

```bash
pnpm build
pnpm preview
```

其他命令：

```bash
pnpm check        # Astro + TypeScript 类型检查
pnpm new-post -- 我的新文章
pnpm format       # Biome 格式化
pnpm lint         # Biome 检查并修复
```

## 写文章

文章位于 `src/content/posts/`，每篇一个文件夹或单个 `.md` 文件。Frontmatter 示例：

```yaml
---
title: 文章标题
published: 2026-10-20
description: 一句话摘要，用于列表、搜索与分享
image: ./cover.webp
tags: [Astro, 前端]
category: 技术
draft: false
lang: zh_CN
---
```

- `draft: true` 的文章不会出现在生产构建中。
- `image` 使用相对于文章文件的图片路径，Astro 会自动优化。
- 文章封面建议 16:9，WebP 格式。

## 站点配置

| 内容 | 位置 |
| --- | --- |
| 标题、副标题、主题色、横幅、目录、favicon | `src/config.ts` |
| 导航栏、个人资料、社交链接 | `src/config.ts` |
| 许可协议 | `src/config.ts` |
| 站点域名（影响 sitemap、canonical） | `astro.config.mjs` 的 `site` |
| 分类英文别名（用于 URL） | `src/utils/taxonomy-utils.ts` |
| 关于页 | `src/content/spec/about.md` |

标签与分类会生成独立静态路由：`/tags/`、`/tags/<tag>/`、`/categories/`、`/categories/<category>/`。未分类文章通过 `/archive/?uncategorized=true` 查看。

品牌图片：

- 横幅：`src/assets/images/banner.webp`
- 头像：`src/assets/images/avatar.webp`
- favicon：`public/favicon/`
- 文章封面：各文章目录下的 `cover.webp`

## Giscus 评论（已配置，待安装 App）

评论仓库 [Spiderkiler/ffdblog-comments](https://github.com/Spiderkiler/ffdblog-comments) 已创建并开启 Discussions，`src/config.ts` 中的 `giscusConfig` 已填好 `repoId`、`categoryId` 且 `enable: true`。

唯一剩余步骤（GitHub App 安装必须由账号所有者在浏览器中完成）：

1. 打开 <https://github.com/apps/giscus>，点击 Install。
2. 选择 `ffdblog-comments` 仓库完成授权。

安装后评论区立即生效，无需重新构建；安装前评论区会显示 giscus 的"未安装"提示，属正常现象。

评论区按需加载（滚动到附近才请求 iframe），并会跟随站点明暗主题切换。评论数据以 GitHub Discussions 形式存放在评论仓库的 `Announcements` 分类中，每篇文章按路径对应一个 Discussion。

## 部署到 Cloudflare Pages

1. 把代码推送到 GitHub 仓库。
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，选择该仓库。
3. 构建配置：
   - Framework preset：`Astro`
   - Build command：`pnpm build`
   - Build output directory：`dist`
   - 环境变量：`NODE_VERSION=20`（或更高）
4. 部署完成后，把 `astro.config.mjs` 中的 `site` 改为最终域名，再触发一次部署。

Cloudflare Pages 免费版提供无限静态请求、每月 500 次构建、单文件 25 MB，足够个人博客使用。

## 目录速览

```text
src/
  components/     组件（含 Taxonomy 列表、Comments 等）
  content/posts/  文章
  content/spec/   关于页 Markdown
  layouts/        页面布局
  pages/          路由（首页、归档、标签、分类、文章、404）
  utils/          URL、内容、taxonomy 工具
  config.ts       站点配置入口
public/           favicon、静态资源
```

## 许可

博客内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可。主题基于 [Fuwari](https://github.com/saicaca/fuwari)（MIT License）。
