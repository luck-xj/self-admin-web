import { eventHandler, getRouterParam } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { MOCK_ROLE_LIST } from '~/utils/mock-data';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const id = getRouterParam(event, 'id');
  const index = MOCK_ROLE_LIST.findIndex((r) => r.id === id);
  if (index !== -1) {
    MOCK_ROLE_LIST.splice(index, 1);
  }
  return useResponseSuccess(true);
});
