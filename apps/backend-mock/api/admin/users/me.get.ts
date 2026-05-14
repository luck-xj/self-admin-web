import { eventHandler } from 'h3';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

export default eventHandler((event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }
  return useResponseSuccess({
    user: {
      uuid: String(userinfo.id),
      username: userinfo.username,
      nickname: userinfo.realName,
      avatar: '',
      status: '1',
      createdAt: '2026-05-10 10:00:00',
      updatedAt: '2026-05-10 10:00:00',
      email: `${userinfo.username}@example.com`,
      phone: '13800000000',
      remark: '',
      roles: userinfo.roles,
      roleNames: userinfo.roles.map((r: string) => {
        const map: Record<string, string> = {
          super: '系统管理员',
          admin: '管理员',
          user: '普通用户',
        };
        return map[r] || r;
      }),
      homePath: userinfo.homePath || '/dashboard/index',
    },
  });
});
