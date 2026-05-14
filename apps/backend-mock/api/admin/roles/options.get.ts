import { eventHandler } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { roleOptions } from '~/utils/system-users';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  return useResponseSuccess({ list: roleOptions });
});
