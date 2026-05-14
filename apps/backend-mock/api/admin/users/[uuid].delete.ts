import { eventHandler, getRouterParam } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { users } from '~/utils/system-users';
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

  users.splice(index, 1);
  return useResponseSuccess(true);
});
