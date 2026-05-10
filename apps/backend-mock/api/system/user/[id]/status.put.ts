import { eventHandler, getRouterParam, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { type UserStatus, users } from '~/utils/system-users';
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
  const body = await readBody<{ status: UserStatus }>(event);
  const user = users.find((item) => item.id === id);
  if (!user) {
    return useResponseError('用户不存在');
  }

  user.status = body.status;
  return useResponseSuccess(user);
});
