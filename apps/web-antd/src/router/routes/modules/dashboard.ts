import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
        component: () => import('#/views/dashboard/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:layout-dashboard',
          title: '首页',
        },
      },
    ],
  },
];

export default routes;
