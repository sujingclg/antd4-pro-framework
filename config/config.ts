import { defineConfig } from 'umi';
import pageRoutes from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {},
  dva: {},
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading',
  // },
  request: {
    dataField: '',
  },

  routes: pageRoutes,

  hash: true,
  // theme: {
  //   '@primary-color': '#38ACC1',
  // },
  // base: '/',
  // publicPath: '/',

  // devServer: {
  //   port: 9003,
  // },

  // proxy: {
  //   '/api/': {
  //     target: 'https://your.website',
  //     ws: true,
  //     changeOrigin: true,
  //     onProxyReq(proxyReq: any) {
  //       proxyReq.setHeader('cookie', ['your cookie']);
  //     },
  //   },
  // },
});
