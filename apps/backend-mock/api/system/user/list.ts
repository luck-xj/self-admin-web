import { eventHandler, getQuery } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { users } from '~/utils/system-users';
import { unAuthorizedResponse, usePageResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const { keyword, page = 1, pageSize = 20, role, status } = getQuery(event);
  let listData = structuredClone(users);

  if (keyword) {
    const value = String(keyword).toLowerCase();
    listData = listData.filter((item) =>
      [item.username, item.nickname, item.email, item.phone].some((field) =>
        field.toLowerCase().includes(value),
      ),
    );
  }

  if (status) {
    listData = listData.filter((item) => item.status === status);
  }

  if (role) {
    listData = listData.filter((item) => item.roles.includes(String(role)));
  }

  return usePageResponseSuccess(page as string, pageSize as string, listData);
});
