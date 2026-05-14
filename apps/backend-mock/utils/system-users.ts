export interface RoleOption {
  label: string;
  value: string;
}

export type UserStatus = 'disabled' | 'enabled';

export interface UserItem {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  phone: string;
  remark?: string;
  role: string;
  roleName: string;
  status: UserStatus;
  username: string;
}

export interface UserFormData {
  email: string;
  nickname: string;
  phone: string;
  remark?: string;
  role: string;
  status: UserStatus;
  username: string;
}

export const roleOptions: RoleOption[] = [
  { label: '管理员', value: 'admin' },
  { label: '运营', value: 'operator' },
  { label: '访客', value: 'viewer' },
];

export const users: UserItem[] = [
  {
    id: '1',
    createdAt: '2026-05-10 10:00:00',
    email: 'admin@example.com',
    nickname: '系统管理员',
    phone: '13800000000',
    remark: '内置管理员账号',
    role: 'admin',
    roleName: '管理员',
    status: 'enabled',
    username: 'admin',
  },
  {
    id: '2',
    createdAt: '2026-05-10 10:10:00',
    email: 'operator@example.com',
    nickname: '运营人员',
    phone: '13900000000',
    remark: '日常运营账号',
    role: 'operator',
    roleName: '运营',
    status: 'enabled',
    username: 'operator',
  },
];

export function enrichRoleNames<T extends { role: string }>(
  user: T,
): T & { roleName: string } {
  return {
    ...user,
    roleName:
      roleOptions.find((item) => item.value === user.role)?.label ?? user.role,
  };
}

export function nowText() {
  return new Intl.DateTimeFormat('zh-CN', {
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    month: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
  })
    .format(new Date())
    .replaceAll('/', '-');
}
