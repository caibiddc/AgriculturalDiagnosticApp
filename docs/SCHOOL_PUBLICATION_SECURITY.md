# 校园 GPU 服务器：上线与漏扫前事项

部署路线：**学校网管审批 → 获得公网访问映射/规则 → 漏洞扫描 → 校方允许的域名 → HTTPS → 公开验收**。域名本身不会给私有 IP 提供公网可达性。

已知条件：Linux + NVIDIA GPU，服务器无法访问 GitHub，Cloudflare Tunnel 对 TCP/UDP 7844 的连接均失败。不要通过未批准的反向隧道绕过校园网络策略。

## 网络与访问控制

- 仅在校方批准后公布网站：公网建议只开放 HTTPS 443，按证书签发方案决定是否需要 80。
- Nginx 将 `/api/` 原样转发至 `127.0.0.1:3000`，`proxy_pass http://127.0.0.1:3000;` **末尾不要加斜线**。
- NestJS 的 3001–3007、AI Flask 5000、MySQL 3306、Redis 6379、Consul 等仅供内部访问；SSH 限定管理网段。
- 身份认证与管理员权限必须在服务端强制校验，不能依赖前端隐藏入口。

## 需要整改的已发现问题

1. `apps/web/vite.config.ts` 目前在开发代理中剥离 `/api`。
2. `apps/backend/Dockerfile` 目前将 `.env*` 从构建阶段复制到生产镜像；`.dockerignore` 对秘密文件隔离不足。
3. `apps/backend/docker-compose.yml` 目前发布 3000–3007 的宿主机端口。
4. `services/ai/docker-compose.yml` 目前发布 5000；`config/app_config.py` 的 `FLASK_DEBUG` 默认 True，`JWT_SECRET` 有示例默认密钥。
5. 移动端 `api/index.tsx` 默认 API 为旧域名，后端 CORS 也仍含旧域名。
6. 需审查上传类型、上传大小、路径遍历、模型文件来源、弱网任务幂等性、Swagger/监控接口暴露及日志中敏感信息。

## 部署与验证

- 新代码从能访问 GitHub 的电脑构建和测试，再以经批准的方式传入服务器；服务器不必能访问 GitHub。
- GPU 环境先核对 `nvidia-smi`、NVIDIA Container Toolkit、PyTorch/CUDA 兼容性。
- 数据库、Redis、Consul、OSS、Celery Worker 等依赖需分别配置、检查网络并演练重启与备份恢复。
- 漏扫前完成依赖审计、镜像扫描、登录限流、CORS/CSRF 检查、JWT 密钥更换、HTTPS 配置和端到端诊断测试。
- 只有在校方正式审批通过、校外手机网络实测可用后，才将生产域名写入 Web/移动端配置并公开。
