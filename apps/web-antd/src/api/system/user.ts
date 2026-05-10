import type {
  UserFormData,
  UserItem,
  UserListParams,
  UserListResult,
  UserStatus,
} from './model';

import { requestClient } from '#/api/request';

export async function getUserList(params: UserListParams) {
  return requestClient.get<UserListResult>('/system/user/list', { params });
}

export async function createUser(data: UserFormData) {
  return requestClient.post<UserItem>('/system/user', data);
}

export async function updateUser(id: string, data: UserFormData) {
  return requestClient.put<UserItem>(`/system/user/${id}`, data);
}

export async function deleteUser(id: string) {
  return requestClient.delete<boolean>(`/system/user/${id}`);
}

export async function updateUserStatus(id: string, status: UserStatus) {
  return requestClient.put<UserItem>(`/system/user/${id}/status`, { status });
}

export async function resetUserPassword(id: string) {
  return requestClient.post<{ password: string }>(
    `/system/user/${id}/password`,
  );
}
