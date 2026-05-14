export interface RoleOption {
  label: string;
  value: string;
}

export type UserStatus = 0 | 1;

export interface UserItem {
  uuid: string;
  created_at: string;
  email: string;
  nickname: string;
  phone: string;
  remark?: string;
  roles: string[];
  role_names: string[];
  status: UserStatus;
  username: string;
}

export interface UserListParams {
  username?: string;
  page?: number;
  page_size?: number;
  status?: UserStatus;
}

export interface UserListResult {
  list: UserItem[];
  total: number;
}

export interface UserFormData {
  email: string;
  nickname: string;
  password?: string;
  phone: string;
  remark?: string;
  role: string;
  status: UserStatus;
  username: string;
}
