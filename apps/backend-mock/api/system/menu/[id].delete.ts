import { eventHandler, getRouterParam } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_MENU_LIST } from '~/utils/mock-data';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

function removeMenuById(menus: any[], id: string): boolean {
  for (let i = menus.length - 1; i >= 0; i--) {
    if (String(menus[i].id) === id) {
      menus.splice(i, 1);
      return true;
    }
    if (menus[i].children?.length) {
      if (removeMenuById(menus[i].children, id)) {
        return true;
      }
    }
  }
  return false;
}

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const id = getRouterParam(event, 'id');
  removeMenuById(MOCK_MENU_LIST, id ?? '');
  return useResponseSuccess(true);
});
