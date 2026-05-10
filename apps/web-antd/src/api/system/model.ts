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
  roleNames: string[];
  roles: string[];
  status: UserStatus;
  username: string;
}

export interface UserListParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  role?: string;
  status?: UserStatus;
}

export interface UserListResult {
  items: UserItem[];
  total: number;
}

export interface UserFormData {
  email: string;
  nickname: string;
  phone: string;
  remark?: string;
  roles: string[];
  status: UserStatus;
  username: string;
}
