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
  //   '@primary-color': '#38ACC1'
  // },
  // base: '/novel',
  // publicPath: '//s3.pstatp.com/toutiao/lab-speech/novel/',
});
