# 农作物病虫害诊断平台整合方案（准备阶段）

当前工作在本仓库的独立功能分支进行，**不覆盖移动端 main，也不修改 mmdxiaoxin 的原仓库**。

## 目标结构

统一 Git 仓库 `caibiddc/agricultural-diagnostic-platform`（需要先创建空白仓库）：

- `apps/mobile` ← `caibiddc/AgriculturalDiagnosticApp`（当前 main 提交 `ce613cb03746ebd59d699b9a63f24beae9ecb299`）
- `apps/web` ← `mmdxiaoxin/agricultural-diagnostic-web`（当前 main 提交 `8b6dff29e4c3e1d59579d8c317f3649f2e1bdaf5`）
- `apps/backend` ← `mmdxiaoxin/agricultural-diagnostic-service`（当前 master 提交 `e29160902a595db4c1302903d7aeb726cf1ccf5f`）
- `services/ai` ← `mmdxiaoxin/agricultural-ai-service`（当前 master 提交 `021aa25c262e27a871a363c113d96c221b872dcd`）

**源代码共享一个 Git 仓库，各组件仍作为四个独立模块构建与运行。** NestJS 原有多个微服务保持在 `apps/backend/apps` 内，AI 模型保留 Python/GPU 环境。

当前 `caibiddc/AgriculturalDiagnosticApp` 与原 `mmdxiaoxin/AgriculturalDiagnosticApp` 对应主分支提交一致，无需重复迁移同一份移动端代码。

## 迁移原则

1. 用 `git subtree add`，且不启用 `--squash`，保留四个项目的原始作者和提交历史。
2. 原仓库全部保留，禁止强制推送、重写作者或清空历史。
3. 合并后修复 Web Vite 代理错误：不能移除 `/api`，NestJS `setGlobalPrefix('api')` 需要保留此前缀。
4. 移除 Backend Dockerfile 中可能将 `.env` 复制进入镜像层的指令，并将环境变量在运行时注入。
5. 不向宿主机发布 3001–3007、5000、3306、6379 等内部服务端口；统一 HTTPS 网关。
6. React Native 默认指向旧域名，需等学校批准新域名后统一改为可配置地址。
7. 在验证许可证合规性后再设置新仓库的公开状态。Web 的 License 与 package.json 声明存在差异，应人工复核。

## 操作

请在可访问 GitHub 的开发电脑上运行 `scripts/merge_platform.sh`，它只创建**本地**合并仓库，不推送代码。执行前请在 GitHub `caibiddc` 账号下创建**空白**的 `agricultural-diagnostic-platform` 仓库。

运行后按 `docs/SCHOOL_PUBLICATION_SECURITY.md` 执行安全整改，再分别运行 Web、移动端、NestJS、AI 测试。相关功能验收必须在数据库、Redis、模型权重、GPU 等依赖到位后执行。

## 验证状态

- 已核对四个源仓库及移动端同源提交，核对 Web/NestJS/AI 相关配置。
- 已使用四份模拟仓库验证无 `--squash` 的 `git subtree` 合并与历史祖先关系。
- **尚未实际合并这四个真实仓库，未验证真实项目构建/功能正常，也未通过学校漏洞扫描。**
