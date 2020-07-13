import menuIconMap from '@/menuIconMap';

type RouterConfigType = {
  exact?: true;
  path?: string;
  wrappers?: string[];
  redirect?: string;
  name?: string;
  icon?: keyof typeof menuIconMap;
  component?: string;
  Routes?: string[];
  authority?: string[];
  locale?: boolean;
  hideInMenu?: boolean;
  hideInBreadcrumb?: boolean;
  clickable?: boolean; // 是否在面包屑中可点击, 如果存在 routes, 需要放置在父级上
  routes?: Array<RouterConfigType>;
  target?: '_blank' | '_parent' | '_self' | '_top';
};

const routerConfig: Array<RouterConfigType> = [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    // umi 要求在父级路由中配置权限, 则直接自路由可在配置中获取到父级路由的权限, 而其余间接子元素均获取不到. 详见 getMenuData.ts
    // authority: ['guest', 'user', 'admin'],
    wrappers: ['@/wrappers/Authorized'],
    routes: [
      {
        path: './',
        name: '首页',
        icon: 'home',
        component: '@/pages/',
      },
      {
        exact: true,
        path: './create-project',
        name: '创建项目',
        icon: 'form',
        component: '@/pages/StepForm',
      },
      {
        path: '/exception',
        // name: 'Exception',
        routes: [
          {
            exact: true,
            path: '403',
            name: '403',
            component: '@/pages/Exception/403',
          },
          {
            exact: true,
            path: '404',
            name: '404',
            component: '@/pages/Exception/404',
          },
          {
            exact: true,
            path: '500',
            name: '500',
            component: '@/pages/Exception/500',
          },
          { component: '@/pages/404' },
        ],
      },
      { component: '@/pages/404' },
    ],
  },
];

export default routerConfig;
