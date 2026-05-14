import { eventHandler, getRouterParam, readBody } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_ROLE_LIST } from '~/utils/mock-data';
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
  const body = await readBody(event);

  const role = MOCK_ROLE_LIST.find((r) => r.id === id);
  if (!role) {
    return useResponseError('角色不存在');
  }

  Object.assign(role, body);
  return useResponseSuccess(role);
});
