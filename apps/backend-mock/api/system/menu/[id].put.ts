import { eventHandler, getRouterParam, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_MENU_LIST } from '~/utils/mock-data';
import {
  unAuthorizedResponse,
  useResponseError,
  useResponseSuccess,
} from '~/utils/response';

function findMenuById(menus: any[], id: string): any | undefined {
  for (const menu of menus) {
    if (String(menu.id) === id) {
      return menu;
    }
    if (menu.children?.length) {
      const found = findMenuById(menu.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  const menu = findMenuById(MOCK_MENU_LIST, id ?? '');
  if (!menu) {
    return useResponseError('菜单不存在');
  }

  Object.assign(menu, body);
  return useResponseSuccess(menu);
});
