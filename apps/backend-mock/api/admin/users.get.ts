import { eventHandler, getQuery } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { users } from '~/utils/system-users';
import { unAuthorizedResponse, usePageResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const { username, page = 1, pageSize = 20, status } = getQuery(event);
  let listData = structuredClone(users);

  if (username) {
    const value = String(username).toLowerCase();
    listData = listData.filter((item) =>
      item.username.toLowerCase().includes(value),
    );
  }

  if (status) {
    listData = listData.filter((item) => item.status === status);
  }

  // 适配后端字段：id → uuid, roleNames → roleName（单数）
  const mapped = listData.map((item) => ({
    ...item,
    uuid: item.id,
  }));

  return usePageResponseSuccess(page as string, pageSize as string, mapped);
});
