<a href="https://github.com/iFurySt/DESIGN.md">
     <img width="1500" height="801" alt="DESIGN.md" src="https://github.com/user-attachments/assets/b223822b-fc76-4574-9dc1-0d31078d1267" />
</a>


<br/>
<br/>

<div align="center">

[English](README.md) | [简体中文](README.zh-CN.md)

</div>

<div align="center">
    <strong>收集并整理来自优秀网站的 DESIGN.md，供 AI Agent 直接复用。</strong>
    <br />
    <br />

</div>

<div align="center">

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![DESIGN.md Count](https://img.shields.io/badge/DESIGN.md%20count-62-10b981?style=classic)
[![Last Update](https://img.shields.io/github/last-commit/iFurySt/DESIGN.md?label=Last%20update&style=classic)](https://github.com/iFurySt/DESIGN.md)

</div>
</div>

# DESIGN.md

从真实网站提取整理出的 `DESIGN.md` 集合，供 AI coding / design agent 直接复用。

把某个站点的 `DESIGN.md` 放进项目，再告诉 Agent 按这份设计系统生成页面，就能更稳定地得到一致的视觉风格。

## 这是什么

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) 是一种给 AI Agent 使用的纯文本设计系统格式。

这个仓库主要收集：

- `DESIGN.md`
- `preview.html`
- `preview-dark.html`

这个 fork 由 [iFurySt](https://github.com/iFurySt/DESIGN.md) 维护。公开设计页可访问 [ifuryst.com/DESIGN.md/](https://www.ifuryst.com/DESIGN.md/)。

## 如何新增新的 DESIGN.md

这个 fork 鼓励社区直接新增新的 `DESIGN.md`。

可以直接使用仓库里的 skill：

```text
Use $design-md-creator to analyze https://example.com and create a new DESIGN.md.
```

全局安装到 Codex：

```bash
npx skills add iFurySt/DESIGN.md -g -a codex --skill design-md-creator -y
```

更新已有的全局安装：

```bash
npx skills update design-md-creator -g -y
```

这个 skill 位于 [skills/design-md-creator/SKILL.md](/Users/ifuryst/projects/github/awesome-design-md/skills/design-md-creator/SKILL.md)，目标是帮助 AI Agent 根据一个公开网站 URL 生成：

- `design-md/<slug>/DESIGN.md`
- `design-md/<slug>/preview.html`
- `design-md/<slug>/preview-dark.html`
- `design-md/<slug>/README.md`

## 收录内容

### AI & LLM Platforms

- [**Claude**](https://www.ifuryst.com/DESIGN.md/claude/design-md) - Anthropic 的 AI 助手。暖陶土色点缀，干净的编辑风布局
- [**Cohere**](https://www.ifuryst.com/DESIGN.md/cohere/design-md) - 企业级 AI 平台。高饱和渐变、数据仪表盘风格
- [**ElevenLabs**](https://www.ifuryst.com/DESIGN.md/elevenlabs/design-md) - AI 语音平台。偏电影感的深色界面
- [**Minimax**](https://www.ifuryst.com/DESIGN.md/minimax/design-md) - 模型平台。深色界面配霓虹强调色
- [**Mistral AI**](https://www.ifuryst.com/DESIGN.md/mistral.ai/design-md) - 开源权重模型平台。极简、偏紫调
- [**Ollama**](https://www.ifuryst.com/DESIGN.md/ollama/design-md) - 本地运行 LLM。终端感、黑白极简
- [**OpenCode AI**](https://www.ifuryst.com/DESIGN.md/opencode.ai/design-md) - AI 编码平台。面向开发者的深色界面
- [**Replicate**](https://www.ifuryst.com/DESIGN.md/replicate/design-md) - 模型 API 平台。白底、代码感强
- [**RunwayML**](https://www.ifuryst.com/DESIGN.md/runwayml/design-md) - AI 视频生成。媒体化、电影感深色风格
- [**Together AI**](https://www.ifuryst.com/DESIGN.md/together.ai/design-md) - 开源 AI 基础设施。蓝图式技术感
- [**VoltAgent**](https://www.ifuryst.com/DESIGN.md/voltagent/design-md) - AI Agent 框架。纯黑画布、绿色强调、终端气质
- [**xAI**](https://www.ifuryst.com/DESIGN.md/x.ai/design-md) - xAI。黑白极简、未来感

### Developer Tools & IDEs

- [**Cursor**](https://www.ifuryst.com/DESIGN.md/cursor/design-md) - AI 优先代码编辑器
- [**Expo**](https://www.ifuryst.com/DESIGN.md/expo/design-md) - React Native 平台
- [**Lovable**](https://www.ifuryst.com/DESIGN.md/lovable/design-md) - AI 全栈构建工具
- [**Raycast**](https://www.ifuryst.com/DESIGN.md/raycast/design-md) - 效率启动器
- [**Superhuman**](https://www.ifuryst.com/DESIGN.md/superhuman/design-md) - 邮件客户端
- [**Vercel**](https://www.ifuryst.com/DESIGN.md/vercel/design-md) - 前端部署平台
- [**Warp**](https://www.ifuryst.com/DESIGN.md/warp/design-md) - 现代终端

### Backend, Database & DevOps

- [**ClickHouse**](https://www.ifuryst.com/DESIGN.md/clickhouse/design-md)
- [**Composio**](https://www.ifuryst.com/DESIGN.md/composio/design-md)
- [**HashiCorp**](https://www.ifuryst.com/DESIGN.md/hashicorp/design-md)
- [**MongoDB**](https://www.ifuryst.com/DESIGN.md/mongodb/design-md)
- [**PostHog**](https://www.ifuryst.com/DESIGN.md/posthog/design-md)
- [**Sanity**](https://www.ifuryst.com/DESIGN.md/sanity/design-md)
- [**Sentry**](https://www.ifuryst.com/DESIGN.md/sentry/design-md)
- [**Supabase**](https://www.ifuryst.com/DESIGN.md/supabase/design-md)

### Productivity & SaaS

- [**Cal.com**](https://www.ifuryst.com/DESIGN.md/cal/design-md)
- [**Intercom**](https://www.ifuryst.com/DESIGN.md/intercom/design-md)
- [**Linear**](https://www.ifuryst.com/DESIGN.md/linear.app/design-md)
- [**Mintlify**](https://www.ifuryst.com/DESIGN.md/mintlify/design-md)
- [**Notion**](https://www.ifuryst.com/DESIGN.md/notion/design-md)
- [**Resend**](https://www.ifuryst.com/DESIGN.md/resend/design-md)
- [**Zapier**](https://www.ifuryst.com/DESIGN.md/zapier/design-md)

### Design & Creative Tools

- [**Airtable**](https://www.ifuryst.com/DESIGN.md/airtable/design-md)
- [**Clay**](https://www.ifuryst.com/DESIGN.md/clay/design-md)
- [**Figma**](https://www.ifuryst.com/DESIGN.md/figma/design-md)
- [**Framer**](https://www.ifuryst.com/DESIGN.md/framer/design-md)
- [**Miro**](https://www.ifuryst.com/DESIGN.md/miro/design-md)
- [**Webflow**](https://www.ifuryst.com/DESIGN.md/webflow/design-md)

### Fintech & Crypto

- [**Binance**](https://www.ifuryst.com/DESIGN.md/binance/design-md)
- [**Coinbase**](https://www.ifuryst.com/DESIGN.md/coinbase/design-md)
- [**Kraken**](https://www.ifuryst.com/DESIGN.md/kraken/design-md)
- [**Revolut**](https://www.ifuryst.com/DESIGN.md/revolut/design-md)
- [**Stripe**](https://www.ifuryst.com/DESIGN.md/stripe/design-md)
- [**Wise**](https://www.ifuryst.com/DESIGN.md/wise/design-md)

### E-commerce & Retail

- [**Airbnb**](https://www.ifuryst.com/DESIGN.md/airbnb/design-md)
- [**Meta**](https://www.ifuryst.com/DESIGN.md/meta/design-md)
- [**Nike**](https://www.ifuryst.com/DESIGN.md/nike/design-md)
- [**Shopify**](https://www.ifuryst.com/DESIGN.md/shopify/design-md)

### Media & Consumer Tech

- [**Apple**](https://www.ifuryst.com/DESIGN.md/apple/design-md)
- [**IBM**](https://www.ifuryst.com/DESIGN.md/ibm/design-md)
- [**NVIDIA**](https://www.ifuryst.com/DESIGN.md/nvidia/design-md)
- [**Pinterest**](https://www.ifuryst.com/DESIGN.md/pinterest/design-md)
- [**SpaceX**](https://www.ifuryst.com/DESIGN.md/spacex/design-md)
- [**Spotify**](https://www.ifuryst.com/DESIGN.md/spotify/design-md)
- [**Uber**](https://www.ifuryst.com/DESIGN.md/uber/design-md)

### Automotive

- [**BMW**](https://www.ifuryst.com/DESIGN.md/bmw/design-md)
- [**Ferrari**](https://www.ifuryst.com/DESIGN.md/ferrari/design-md)
- [**Lamborghini**](https://www.ifuryst.com/DESIGN.md/lamborghini/design-md)
- [**Renault**](https://www.ifuryst.com/DESIGN.md/renault/design-md)
- [**Tesla**](https://www.ifuryst.com/DESIGN.md/tesla/design-md)

## 如何使用

1. 从列表里选一个站点
2. 把它的 `DESIGN.md` 复制到项目根目录
3. 告诉你的 AI Agent 按这份设计系统生成页面

## 贡献

详细说明见 [CONTRIBUTING.md](CONTRIBUTING.md)。

- **新增文件**：欢迎新增新的 `DESIGN.md`
- **改进现有文件**：修正颜色、token、描述问题
- **提交 PR**：欢迎新设计和修正一起维护

## License

MIT License - see [LICENSE](LICENSE)

本仓库收集的是从公开网站提取整理出的设计系统文档。所有 `DESIGN.md` 均按现状提供，不附带任何保证。提取到的设计 token 来自公开可见的 UI/CSS，我们不主张这些网站视觉资产的所有权。这些文档的目标是帮助 AI Agent 更稳定地生成一致的界面风格。
