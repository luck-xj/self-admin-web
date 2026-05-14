import { eventHandler, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_MENU_LIST } from '~/utils/mock-data';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

let nextMenuId = 20_200;

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const body = await readBody(event);
  const newMenu = {
    ...body,
    id: nextMenuId++,
  };
  MOCK_MENU_LIST.push(newMenu);
  return useResponseSuccess(newMenu);
});
