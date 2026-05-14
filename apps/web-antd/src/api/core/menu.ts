import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  const menus = await requestClient.get<
    { list: RouteRecordStringComponent[] } | RouteRecordStringComponent[]
  >('/menu/all');

  return Array.isArray(menus) ? menus : menus.list;
}
