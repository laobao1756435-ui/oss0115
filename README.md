# 蛋糕店 AI 电子图册（Demo 应用）

本仓库包含根据需求文档生成的可运行 Demo：

- `app/`：用户端应用（首页、图册、AI 设计、案例、咨询、收藏）
- `admin/`：商家后台应用（商品管理、AI 素材、消息管理、店铺设置）

## 本地开发运行

```bash
python3 -m http.server 8000
```

打开：

- 用户端：`http://localhost:8000/app/`
- 商家端：`http://localhost:8000/admin/`

## Docker 部署上线（推荐）

### 1) 构建并启动

```bash
docker compose up -d --build
```

### 2) 访问地址

- 入口页：`http://<你的服务器IP>:8080/`
- 用户端：`http://<你的服务器IP>:8080/app/`
- 商家端：`http://<你的服务器IP>:8080/admin/`
- 健康检查：`http://<你的服务器IP>:8080/healthz`

### 3) 常用运维命令

```bash
# 查看状态
docker compose ps

# 查看日志
docker compose logs -f

# 重新部署
docker compose up -d --build

# 停止服务
docker compose down
```

## Vercel 一键托管（静态站）

仓库已包含 `vercel.json`，可直接在 Vercel 导入仓库部署：

1. 登录 Vercel，点击 **Add New Project**。
2. 选择本仓库并导入。
3. Framework 选择 **Other**，无需构建命令。
4. 点击 Deploy。

部署成功后可直接访问：

- `/app/` 用户端
- `/admin/` 商家端
