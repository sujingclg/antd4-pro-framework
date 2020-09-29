import { defineConfig } from 'umi';
import pageRoutes from './router.config';

export default defineConfig({
  antd: {},
  dva: {},
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading',
  // },

  routes: pageRoutes,

  hash: true,
  // theme: {
  //   '@primary-color': '#38ACC1',
  // },
  // base: '/',
  // publicPath: '//sf6-scmcdn-tos.pstatp.com/goofy/lab-speech/console/',
});
