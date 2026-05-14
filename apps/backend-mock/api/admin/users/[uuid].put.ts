import { eventHandler, getRouterParam, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { enrichRoleNames, users } from '~/utils/system-users';
import type { UserFormData } from '~/utils/system-users';
import {
  unAuthorizedResponse,
  useResponseError,
  useResponseSuccess,
} from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const uuid = getRouterParam(event, 'uuid');
  const index = users.findIndex((item) => item.id === uuid);
  if (index < 0) {
    return useResponseError('用户不存在');
  }

  const body = await readBody<UserFormData>(event);
  if (
    users.some((item) => item.id !== uuid && item.username === body.username)
  ) {
    return useResponseError('用户名已存在');
  }

  users[index] = enrichRoleNames({
    ...users[index],
    ...body,
  });

  return useResponseSuccess({ ...users[index], uuid: users[index].id });
});
