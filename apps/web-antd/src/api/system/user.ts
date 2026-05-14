import type {
  UserFormData,
  UserItem,
  UserListParams,
  UserListResult,
  UserStatus,
} from './model';

import { requestClient } from '#/api/request';

export async function getUserList(params: UserListParams) {
  return requestClient.get<UserListResult>('/admin/users', { params });
}

export async function createUser(data: UserFormData) {
  return requestClient.post<UserItem>('/admin/users', data);
}

export async function updateUser(uuid: string, data: UserFormData) {
  return requestClient.put<UserItem>(`/admin/users/${uuid}`, data);
}

export async function deleteUser(uuid: string) {
  return requestClient.delete<boolean>(`/admin/users/${uuid}`);
}

export async function updateUserStatus(uuid: string, status: UserStatus) {
  return requestClient.put<UserItem>(`/admin/users/${uuid}/status`, { status });
}

export async function resetUserPassword(uuid: string) {
  return requestClient.post(`/admin/users/${uuid}/password/reset`);
}
