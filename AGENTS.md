# 仓库协作说明

## 项目结构

本仓库是基于 `vbenjs/vue-vben-admin` 裁剪后的前端管理后台，只保留登录、首页和用户管理模块。

- `apps/web-antd/`：当前唯一前端应用，使用 Vue 3、Vite、TypeScript 和 Ant Design Vue。
- `apps/backend-mock/`：本地模拟接口服务，开发环境由 Vite 自动启动并代理到 `/api`。
- `packages/`：Vben 公共能力包，优先保持官方结构，非必要不要改动。
- `internal/`、`scripts/`：构建、lint、workspace 工具。
- `docs/superpowers/specs/`：设计文档，默认使用中文。
- `docs/superpowers/plans/`：实施计划，默认使用中文。

## 开发命令

本项目使用 pnpm。当前环境通过 corepack 调用：

- `corepack pnpm install` 安装依赖。
- `corepack pnpm dev` 启动 `apps/web-antd` 开发服务。
- `corepack pnpm run build` 构建生产包。
- `corepack pnpm -F @vben/web-antd run typecheck` 执行前端类型检查。

`apps/web-antd/.env.development` 中已开启 Nitro Mock，开发服务会代理 `/api` 到本地模拟服务。

## 当前功能范围

第一版只包含：

- 登录和退出登录。
- 后台首页。
- 系统管理 / 用户管理。
- 用户列表、搜索、分页、新增、编辑、删除、启用/禁用、重置密码。
- 用户表单中的角色选择，角色选项来自模拟接口。

暂不包含角色管理、权限配置、菜单管理、部门管理、图表页、文档页、示例页、外链页和真实后端实现。

## 编码规范

- 优先沿用 Vben 现有目录、请求、路由、布局和组件约定。
- 新增业务代码放在 `apps/web-antd/src/views/` 和 `apps/web-antd/src/api/` 下。
- 页面只调用接口模块，不直接读取模拟数据。
- 模拟数据放在 `apps/backend-mock/`，响应结构尽量贴近未来真实接口。
- 说明文档、设计文档、实施计划默认使用中文。
- 代码标识、文件名、命令、接口路径和第三方库名称保持原文。

## 验证要求

修改代码后至少运行：

- `corepack pnpm -F @vben/web-antd run typecheck`
- `corepack pnpm run build`

如果改动登录、路由、用户管理或模拟接口，还需要启动开发服务并手动验证主要流程。

## 安全与配置

- 不提交真实密钥、账号密码或机器私有配置。
- 本地环境变量使用 `.env.local` 或应用目录下的本地环境文件。
- 当前默认账号来自模拟服务：`admin / 123456`、`vben / 123456`、`jack / 123456`。

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
