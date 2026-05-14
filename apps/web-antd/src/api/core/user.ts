import { requestClient } from '#/api/request';

interface UserInfoResponse {
  user: {
    uuid: string;
    username: string;
    nickname: string;
    avatar: string;
    status: string;
    created_at: string;
    updated_at: string;
    email: string;
    phone: string;
    remark: string;
    roles: string[];
    role_names: string[];
    home_path: string;
  };
}

/**
 * 获取当前用户信息
 */
export async function getUserInfoApi() {
  const resp = await requestClient.get<UserInfoResponse>('/admin/users/me');
  return resp.user;
}
