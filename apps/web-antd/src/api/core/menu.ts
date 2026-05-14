import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  const { list } = await requestClient.get<{
    list: RouteRecordStringComponent[];
  }>('/menu/all');
  return list;
}
