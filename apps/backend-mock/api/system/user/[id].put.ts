import { eventHandler, getRouterParam, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import {
  enrichRoleNames,
  type UserFormData,
  users,
} from '~/utils/system-users';
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

  const id = getRouterParam(event, 'id');
  const index = users.findIndex((item) => item.id === id);
  if (index < 0) {
    return useResponseError('用户不存在');
  }

  const body = await readBody<UserFormData>(event);
  if (users.some((item) => item.id !== id && item.username === body.username)) {
    return useResponseError('用户名已存在');
  }

  users[index] = enrichRoleNames({
    ...users[index],
    ...body,
  });

  return useResponseSuccess(users[index]);
});
