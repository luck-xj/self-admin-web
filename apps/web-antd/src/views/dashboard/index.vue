<script setup lang="ts">
const cards = [
  { label: '当前模块', value: '用户管理' },
  { label: '接口模式', value: '本地模拟数据' },
  { label: '项目状态', value: '精简版' },
];
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h1 class="text-xl font-semibold">后台首页</h1>
      <p class="text-muted-foreground mt-1 text-sm">
        当前版本只保留登录、首页和用户管理模块，后续业务模块按需接入。
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="card in cards"
        :key="card.label"
        class="rounded-md border bg-background p-4"
      >
        <div class="text-muted-foreground text-sm">{{ card.label }}</div>
        <div class="mt-2 text-lg font-medium">{{ card.value }}</div>
      </div>
    </div>
  </div>
</template>
