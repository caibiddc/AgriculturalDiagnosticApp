# 农作物病虫害智能诊断平台

本仓库整合四个 Git 源仓库，完整保留各源提交历史；四个模块分别构建和运行。

| 目录 | 技术 | 模块 |
| --- | --- | --- |
| apps/mobile | React Native | 田间移动端 |
| apps/web | React / Vite | 网页管理与诊断 |
| apps/backend | NestJS | 网关、用户、诊断、文件、知识库 |
| services/ai | Flask / Celery / PyTorch | GPU AI 推理 |

开发：Web 使用 pnpm；移动端与后端使用 npm；AI 使用 Python 环境。

学校 Linux GPU 服务器部署：通过学校审批及漏洞扫描后，使用获批的公网入口、域名、HTTPS Nginx 暴露 Web 与 /api；后台内网服务端口不得直接对公网开放。Cloudflare Tunnel 因 7844 不通而未采用。

参见 docs/SCHOOL_PUBLICATION_SECURITY.md、docs/STUDENT_TASK_BOUNDARIES.md 与 CONTRIBUTING.md。

四个原始许可证分别保留在子项目中，公开发布前需要复核许可和第三方服务条款。
