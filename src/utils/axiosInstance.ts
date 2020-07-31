import axios, { AxiosError } from 'axios';
import { history } from 'umi';
import { notification } from 'antd';
import qs from 'qs';
// import { authorityKey, setAuthority } from './Authorized';

const codeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = ({ response, config }: AxiosError): any => {
  if (response && response.status) {
    const statusCode = response.status;
    const errorText = codeMessage[statusCode] || response.statusText;
    if (statusCode === 401) {
    }
    notification.error({
      message: `请求错误 ${statusCode}: ${config.baseURL?.replace(/\/$/, '')}${config.url}`,
      description: errorText,
    });
    if (statusCode >= 500 && statusCode <= 504) {
      history.push('/exception/500');
    } else if (statusCode >= 404 && statusCode < 422) {
      history.push('/exception/404');
    } else if (statusCode === 403) {
      history.push('/exception/403');
    }
    return Promise.reject(response.data);
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};

const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 30000,
  // headers: {},
});

// axiosInstance.interceptors.request.use(config => {
//   const key = localStorage.getItem(authorityKey);
//   if (key) {
//     config.headers['speech-novel-username'] = key;
//   }
//   return config;
// });

axiosInstance.interceptors.response.use(response => {
  // if (response.config.url && response.config.url.indexOf('/api/user/access/login') !== -1) {
  // localStorage.setItem(authorityKey, response.data.username);
  // }
  return response;
}, errorHandler);

export default axiosInstance;
