<script setup lang="ts">
import type {
  RoleOption,
  UserFormData,
  UserItem,
  UserListParams,
  UserStatus,
} from '#/api/system';
import type {
  FormInstance,
  TableColumnsType,
  TablePaginationConfig,
} from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

import { onMounted, reactive, ref } from 'vue';

import {
  Button,
  Card,
  Form,
  FormItem,
  Input,
  InputPassword,
  message,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'ant-design-vue';

import {
  createUser,
  deleteUser,
  getRoleOptions,
  getUserList,
  resetUserPassword,
  updateUser,
  updateUserStatus,
} from '#/api/system';

const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const columns: TableColumnsType<UserItem> = [
  { dataIndex: 'username', title: '用户名', width: 140 },
  { dataIndex: 'nickname', title: '昵称', width: 140 },
  { dataIndex: 'email', title: '邮箱', width: 200 },
  { dataIndex: 'phone', title: '手机号', width: 140 },
  { dataIndex: 'role_names', title: '角色', width: 100 },
  { dataIndex: 'status', title: '状态', width: 100 },
  { dataIndex: 'created_at', title: '创建时间', width: 180 },
  { dataIndex: 'actions', fixed: 'right', title: '操作', width: 280 },
];

const searchForm = reactive<UserListParams>({
  username: '',
  page: 1,
  page_size: 10,
  status: undefined,
});

const formState = reactive<UserFormData>({
  email: '',
  nickname: '',
  password: '',
  phone: '',
  remark: '',
  role: '',
  status: 1,
  username: '',
});

const formRules: Record<string, Rule[]> = {
  email: [
    { message: '请输入邮箱', required: true },
    { message: '邮箱格式不正确', type: 'email' },
  ],
  nickname: [{ message: '请输入昵称', required: true }],
  phone: [
    { message: '请输入手机号', required: true },
    {
      message: '手机号格式不正确',
      pattern: /^1[3-9]\d{9}$/,
    },
  ],
  remark: [],
  role: [{ message: '请选择角色', required: true }],
  status: [{ message: '请选择状态', required: true }],
  username: [{ message: '请输入用户名', required: true }],
};

const users = ref<UserItem[]>([]);
const roleOptions = ref<RoleOption[]>([]);
const loading = ref(false);
const saving = ref(false);
const modalOpen = ref(false);
const editingId = ref<string>();
const formRef = ref<FormInstance>();
const total = ref(0);

function asUser(record: Record<string, any>) {
  return record as UserItem;
}

function resetForm() {
  editingId.value = undefined;
  Object.assign(formState, {
    email: '',
    nickname: '',
    password: '',
    phone: '',
    remark: '',
    role: '',
    status: 1 as UserStatus,
    username: '',
  });
  formRef.value?.clearValidate();
}

async function loadRoles() {
  const { list } = await getRoleOptions();
  roleOptions.value = list;
}

async function loadUsers() {
  loading.value = true;
  try {
    const { list, total: count } = await getUserList(searchForm);
    users.value = list;
    total.value = count;
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  searchForm.page = 1;
  void loadUsers();
}

function handleReset() {
  Object.assign(searchForm, {
    username: '',
    page: 1,
    page_size: 10,
    status: undefined,
  });
  void loadUsers();
}

function handleTableChange(pagination: TablePaginationConfig) {
  searchForm.page = pagination.current ?? 1;
  searchForm.page_size = pagination.pageSize ?? 10;
  void loadUsers();
}

function handleCreate() {
  resetForm();
  modalOpen.value = true;
}

function handleEdit(record: UserItem) {
  resetForm();
  editingId.value = record.uuid;
  Object.assign(formState, {
    email: record.email,
    nickname: record.nickname,
    phone: record.phone,
    remark: record.remark ?? '',
    role: record.roles?.[0] || '',
    status: record.status,
    username: record.username,
  });
  modalOpen.value = true;
}

async function handleSubmit() {
  await formRef.value?.validate();
  saving.value = true;
  try {
    const { role: _r, ...rest } = formState;
    const data = { ...rest, roles: _r ? [_r] : [] };
    // 编辑时如果不填密码则不传
    if (editingId.value && !data.password) {
      delete data.password;
    }
    if (editingId.value) {
      await updateUser(editingId.value, data as unknown as UserFormData);
      message.success('用户已更新');
    } else {
      await createUser(data as unknown as UserFormData);
      message.success('用户已新增');
    }
    modalOpen.value = false;
    await loadUsers();
  } finally {
    saving.value = false;
  }
}

function handleDelete(record: UserItem) {
  Modal.confirm({
    content: `确认删除用户"${record.nickname}"？`,
    okText: '删除',
    okType: 'danger',
    title: '删除用户',
    async onOk() {
      await deleteUser(record.uuid);
      message.success('用户已删除');
      await loadUsers();
    },
  });
}

async function handleStatusChange(record: UserItem, checked: boolean) {
  const nextStatus: UserStatus = checked ? 1 : 0;
  try {
    await updateUserStatus(record.uuid, nextStatus);
    record.status = nextStatus;
    message.success(checked ? '用户已启用' : '用户已禁用');
  } catch (error) {
    await loadUsers();
    throw error;
  }
}

function handleResetPassword(record: UserItem) {
  Modal.confirm({
    content: `确认将用户"${record.nickname}"的密码重置为默认密码？`,
    okText: '重置',
    title: '重置密码',
    async onOk() {
      await resetUserPassword(record.uuid);
      message.success('密码已重置');
    },
  });
}

onMounted(async () => {
  await loadRoles();
  await loadUsers();
});
</script>

<template>
  <div class="p-4">
    <Card :bordered="false" class="mb-4">
      <Form layout="inline" :model="searchForm">
        <FormItem label="用户名">
          <Input
            v-model:value="searchForm.username"
            allow-clear
            placeholder="请输入用户名"
            @press-enter="handleSearch"
          />
        </FormItem>
        <FormItem label="状态">
          <Select
            v-model:value="searchForm.status"
            allow-clear
            class="w-32"
            :options="statusOptions"
            placeholder="全部"
          />
        </FormItem>
        <FormItem>
          <Space>
            <Button type="primary" @click="handleSearch">查询</Button>
            <Button @click="handleReset">重置</Button>
          </Space>
        </FormItem>
      </Form>
    </Card>

    <Card :bordered="false">
      <template #title>用户管理</template>
      <template #extra>
        <Button type="primary" @click="handleCreate">新增用户</Button>
      </template>

      <Table
        row-key="uuid"
        :columns="columns"
        :data-source="users"
        :loading="loading"
        :pagination="{
          current: searchForm.page,
          pageSize: searchForm.page_size,
          showSizeChanger: true,
          showTotal: (count: number) => `共 ${count} 条`,
          total,
        }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'role_names'">
            <Tag>{{ record.role_names?.[0] }}</Tag>
          </template>
          <template v-else-if="column.dataIndex === 'status'">
            <Switch
              :checked="record.status === 1"
              checked-children="启用"
              un-checked-children="禁用"
              @change="
                (checked) =>
                  handleStatusChange(asUser(record), checked as boolean)
              "
            />
          </template>
          <template v-else-if="column.dataIndex === 'actions'">
            <Space>
              <Button
                size="small"
                type="link"
                @click="handleEdit(asUser(record))"
              >
                编辑
              </Button>
              <Button
                size="small"
                type="link"
                @click="handleResetPassword(asUser(record))"
              >
                重置密码
              </Button>
              <Button
                danger
                size="small"
                type="link"
                @click="handleDelete(asUser(record))"
              >
                删除
              </Button>
            </Space>
          </template>
        </template>
      </Table>
    </Card>

    <Modal
      v-model:open="modalOpen"
      :confirm-loading="saving"
      :title="editingId ? '编辑用户' : '新增用户'"
      width="640px"
      @ok="handleSubmit"
    >
      <Form
        ref="formRef"
        :label-col="{ span: 5 }"
        :model="formState"
        :rules="formRules"
        :wrapper-col="{ span: 18 }"
      >
        <FormItem label="用户名" name="username">
          <Input
            v-model:value="formState.username"
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem label="昵称" name="nickname">
          <Input v-model:value="formState.nickname" placeholder="请输入昵称" />
        </FormItem>
        <FormItem
          v-if="!editingId"
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <InputPassword
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem label="邮箱" name="email">
          <Input v-model:value="formState.email" placeholder="请输入邮箱" />
        </FormItem>
        <FormItem label="手机号" name="phone">
          <Input v-model:value="formState.phone" placeholder="请输入手机号" />
        </FormItem>
        <FormItem label="角色" name="role">
          <Select
            v-model:value="formState.role"
            :options="roleOptions"
            placeholder="请选择角色"
          />
        </FormItem>
        <FormItem label="状态" name="status">
          <Select
            v-model:value="formState.status"
            :options="statusOptions"
            placeholder="请选择状态"
          />
        </FormItem>
        <FormItem label="备注" name="remark">
          <Input v-model:value="formState.remark" placeholder="请输入备注" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
