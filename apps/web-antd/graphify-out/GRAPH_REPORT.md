# Graph Report - apps/web-antd  (2026-05-10)

## Corpus Check
- Corpus is ~6,398 words - fits in a single context window. You may not need a graph.

## Summary
- 148 nodes · 191 edges · 19 communities (17 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Antd Component Adapter|Antd Component Adapter]]
- [[_COMMUNITY_Layout And Locale|Layout And Locale]]
- [[_COMMUNITY_API Request Clients|API Request Clients]]
- [[_COMMUNITY_User Management|User Management]]
- [[_COMMUNITY_Router And Access|Router And Access]]
- [[_COMMUNITY_App Bootstrap|App Bootstrap]]
- [[_COMMUNITY_Form Grid Adapter|Form Grid Adapter]]
- [[_COMMUNITY_Preferences Setup|Preferences Setup]]
- [[_COMMUNITY_Auth Layout Assets|Auth Layout Assets]]
- [[_COMMUNITY_Dashboard Routes|Dashboard Routes]]
- [[_COMMUNITY_System Routes|System Routes]]

## God Nodes (most connected - your core abstractions)
1. `requestClient` - 6 edges
2. `bootstrap()` - 5 edges
3. `initComponentAdapter()` - 5 edges
4. `loadThirdPartyMessage()` - 4 edges
5. `createRouterGuard()` - 4 edges
6. `initApplication()` - 3 edges
7. `initSetupVbenForm()` - 3 edges
8. `previewImage()` - 3 edges
9. `ComponentType` - 3 edges
10. `ComponentPropsMap` - 3 edges

## Surprising Connections (you probably didn't know these)
- `initApplication()` --calls--> `bootstrap()`  [INFERRED]
  src/main.ts → src/bootstrap.ts
- `if()` --calls--> `updateUser()`  [INFERRED]
  src/views/system/user/index.vue → src/api/system/user.ts
- `onOk()` --calls--> `deleteUser()`  [INFERRED]
  src/views/system/user/index.vue → src/api/system/user.ts
- `onOk()` --calls--> `resetUserPassword()`  [INFERRED]
  src/views/system/user/index.vue → src/api/system/user.ts
- `bootstrap()` --calls--> `initComponentAdapter()`  [EXTRACTED]
  src/bootstrap.ts → src/adapter/component/index.ts

## Communities (19 total, 2 thin omitted)

### Community 0 - "Antd Component Adapter"
Cohesion: 0.07
Nodes (29): AdapterUploadProps, AutoComplete, Button, Cascader, Checkbox, CheckboxGroup, DatePicker, Divider (+21 more)

### Community 1 - "Layout And Locale"
Cohesion: 0.13
Nodes (13): BasicLayout(), IFrameView(), antdLocale, loadAntdLocale(), loadDayjsLocale(), loadMessages(), loadThirdPartyMessage(), localesMap (+5 more)

### Community 2 - "API Request Clients"
Cohesion: 0.13
Nodes (6): { apiURL }, baseRequestClient, requestClient, LoginParams, LoginResult, RefreshTokenResult

### Community 3 - "User Management"
Cohesion: 0.15
Nodes (11): RoleOption, UserFormData, UserItem, UserListParams, UserListResult, UserStatus, deleteUser(), resetUserPassword() (+3 more)

### Community 4 - "Router And Access"
Cohesion: 0.17
Nodes (13): createRouterGuard(), setupAccessGuard(), setupCommonGuard(), router, coreRoutes, fallbackNotFoundRoute, accessRoutes, coreRouteNames (+5 more)

### Community 5 - "App Bootstrap"
Cohesion: 0.33
Nodes (7): initSetupVbenForm(), initComponentAdapter(), withDefaultPlaceholder(), withPreviewUpload(), setupI18n(), bootstrap(), initApplication()

### Community 6 - "Form Grid Adapter"
Cohesion: 0.32
Nodes (4): VbenFormProps, VbenFormSchema, ComponentPropsMap, ComponentType

### Community 7 - "Preferences Setup"
Cohesion: 0.6
Nodes (3): overridesPreferences, preferencesExtension, WebAntdPreferencesExtension

### Community 8 - "Auth Layout Assets"
Cohesion: 0.4
Nodes (4): logo, logoDark, AuthPageLayout(), AuthPageLayout()

## Knowledge Gaps
- **45 isolated node(s):** `WebAntdPreferencesExtension`, `VbenFormSchema`, `VbenFormProps`, `AdapterUploadProps`, `AutoComplete` (+40 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initApplication()` connect `App Bootstrap` to `Preferences Setup`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `AuthPageLayout()` connect `Auth Layout Assets` to `Layout And Locale`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `AuthPageLayout()` connect `Auth Layout Assets` to `Router And Access`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `WebAntdPreferencesExtension`, `VbenFormSchema`, `VbenFormProps` to the rest of the system?**
  _45 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Antd Component Adapter` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Layout And Locale` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `API Request Clients` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._

## Run Note

Semantic extraction was skipped because no LLM API key was configured in this environment; this graph is based on deterministic AST extraction only.
