# 精简管理后台

这是一个基于 `vbenjs/vue-vben-admin` 裁剪的前端管理后台。当前版本只保留登录、后台首页和用户管理模块，后端接口由本地模拟服务提供。

## 环境要求

- Node.js `^20.19.0 || ^22.18.0 || ^24.0.0`
- pnpm `>= 10`
- Git

当前项目通过 corepack 使用 pnpm：

```powershell
corepack pnpm --version
```

## 安装依赖

```powershell
corepack pnpm install
```

## 启动开发服务

```powershell
corepack pnpm dev
```

开发应用位于 `apps/web-antd`，默认端口来自 `apps/web-antd/.env.development`：

```text
VITE_PORT=5666
```

开发环境已开启 Nitro Mock，接口请求会通过 `/api` 代理到本地模拟服务。

## 构建

```powershell
corepack pnpm run build
```

构建产物位于：

```text
apps/web-antd/dist
apps/web-antd/dist.zip
```

## 类型检查

```powershell
corepack pnpm -F @vben/web-antd run typecheck
```

## 默认账号

模拟服务内置账号：

| 用户名 | 密码 | 说明 |
| --- | --- | --- |
| `admin` | `123456` | 管理员 |
| `vben` | `123456` | 系统管理员 |
| `jack` | `123456` | 普通用户 |

## 当前功能

- 登录和退出登录。
- 后台首页。
- 系统管理 / 用户管理。
- 用户列表、搜索、分页。
- 新增、编辑、删除用户。
- 启用/禁用用户。
- 重置用户密码。
- 角色选项模拟接口。

## 项目结构

```text
apps/
  backend-mock/   本地模拟接口
  web-antd/       前端应用
docs/
  superpowers/    设计文档和实施计划
internal/         Vben 内部工具配置
packages/         Vben 公共包
scripts/          workspace 工具脚本
```

## 后续接入真实接口

页面代码只调用 `apps/web-antd/src/api/` 下的接口模块。后续接入后端时，优先替换接口地址、接口路径和响应适配，不需要直接改页面读取逻辑。
