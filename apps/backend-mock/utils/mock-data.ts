import { faker } from '@faker-js/faker';

export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
  homePath?: string;
}

export interface TimezoneOption {
  offset: number;
  timezone: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: '系统管理员',
    roles: ['super'],
    username: 'vben',
    homePath: '/dashboard/index',
  },
  {
    id: 1,
    password: '123456',
    realName: '管理员',
    roles: ['admin'],
    username: 'admin',
    homePath: '/dashboard/index',
  },
  {
    id: 2,
    password: '123456',
    realName: '普通用户',
    roles: ['user'],
    username: 'jack',
    homePath: '/dashboard/index',
  },
];

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
    username: 'vben',
  },
  {
    // admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'admin',
  },
  {
    // user
    codes: ['AC_1000001', 'AC_1000002'],
    username: 'jack',
  },
];

const dashboardMenus = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '首页',
    },
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/dashboard/index',
    children: [
      {
        name: 'DashboardIndex',
        path: '/dashboard/index',
        component: '/dashboard/index',
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '首页',
        },
      },
    ],
  },
];

const systemMenus = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 10,
      title: '系统管理',
    },
    name: 'System',
    path: '/system',
    redirect: '/system/user',
    children: [
      {
        name: 'SystemUser',
        path: '/system/user',
        component: '/system/user/index',
        meta: {
          icon: 'lucide:users',
          title: '用户管理',
        },
      },
    ],
  },
];

export const MOCK_MENUS = [
  {
    menus: [...dashboardMenus, ...systemMenus],
    username: 'vben',
  },
  {
    menus: [...dashboardMenus, ...systemMenus],
    username: 'admin',
  },
  {
    menus: [...dashboardMenus, ...systemMenus],
    username: 'jack',
  },
];

export const MOCK_ROLE_LIST = Array.from({ length: 30 }, (_, i) => {
  const d = faker.date.between({ from: '2024-01-01', to: '2025-06-01' });
  const createTime = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(d);
  return {
    id: faker.string.uuid(),
    name: `角色${i + 1}`,
    status: (i % 3 === 0 ? 0 : 1) as 0 | 1,
    createTime,
    permissions: [],
    remark: faker.lorem.sentence(),
  };
});

export const MOCK_MENU_LIST: any[] = [
  {
    id: 1,
    name: 'DashboardIndex',
    status: 1,
    type: 'menu',
    icon: 'lucide:layout-dashboard',
    path: '/dashboard/index',
    component: '/dashboard/index',
    meta: {
      icon: 'lucide:layout-dashboard',
      title: '首页',
      affixTab: true,
      order: 0,
    },
  },
  {
    id: 2,
    meta: {
      icon: 'lucide:settings',
      order: 10,
      title: '系统管理',
    },
    status: 1,
    type: 'catalog',
    name: 'System',
    path: '/system',
    children: [
      {
        id: 201,
        pid: 2,
        path: '/system/user',
        name: 'SystemUser',
        authCode: 'System:User:List',
        status: 1,
        type: 'menu',
        meta: {
          icon: 'lucide:users',
          title: '用户管理',
        },
        component: '/system/user/index',
        children: [
          {
            id: 20_101,
            pid: 201,
            name: 'SystemUserCreate',
            status: 1,
            type: 'button',
            authCode: 'System:User:Create',
            meta: { title: 'common.create' },
          },
          {
            id: 20_102,
            pid: 201,
            name: 'SystemUserEdit',
            status: 1,
            type: 'button',
            authCode: 'System:User:Edit',
            meta: { title: 'common.edit' },
          },
          {
            id: 20_103,
            pid: 201,
            name: 'SystemUserDelete',
            status: 1,
            type: 'button',
            authCode: 'System:User:Delete',
            meta: { title: 'common.delete' },
          },
        ],
      },
    ],
  },
];

export function getMenuIds(menus: any[]) {
  const ids: number[] = [];
  menus.forEach((item) => {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids.push(...getMenuIds(item.children));
    }
  });
  return ids;
}

/**
 * 时区选项
 */
export const TIME_ZONE_OPTIONS: TimezoneOption[] = [
  {
    offset: -5,
    timezone: 'America/New_York',
  },
  {
    offset: 0,
    timezone: 'Europe/London',
  },
  {
    offset: 8,
    timezone: 'Asia/Shanghai',
  },
  {
    offset: 9,
    timezone: 'Asia/Tokyo',
  },
  {
    offset: 9,
    timezone: 'Asia/Seoul',
  },
];
