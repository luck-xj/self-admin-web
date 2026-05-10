import type { RoleOption } from './model';

import { requestClient } from '#/api/request';

export async function getRoleOptions() {
  return requestClient.get<RoleOption[]>('/system/role/options');
}
