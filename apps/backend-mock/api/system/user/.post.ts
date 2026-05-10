import { eventHandler, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import {
  enrichRoleNames,
  nowText,
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

  const body = await readBody<UserFormData>(event);
  if (users.some((item) => item.username === body.username)) {
    return useResponseError('用户名已存在');
  }

  const user = enrichRoleNames({
    ...body,
    id: `${Date.now()}`,
    createdAt: nowText(),
  });
  users.unshift(user);

  return useResponseSuccess(user);
});
