# 蛋糕店 AI 电子图册（Demo 应用）

本仓库包含根据需求文档生成的可运行 Demo：

- `app/`：用户端应用（首页、图册、AI 设计、案例、咨询、收藏）
- `admin/`：商家后台应用（商品管理、AI 素材、消息管理、店铺设置）

## 本地运行

```bash
python3 -m http.server 8000
```

打开：

- 用户端：`http://localhost:8000/app/`
- 商家端：`http://localhost:8000/admin/`
