// import axiosInstance from '@/utils/axiosInstance';
// // import { history } from 'umi';
// import { setAuthority } from '@/utils/Authorized';
// import { IBaseResponse, IBackendUserItem } from '@/data';
//
// let extraRoutes: any;
//
// export async function render(oldRender: Function) {
//   try {
//     const {
//       data: { data },
//     } = await axiosInstance.get<IBaseResponse<IBackendUserItem>>('/whoami');
//     const authority = data.permission;
//     switch (authority) {
//       case 'admin':
//         setAuthority('admin');
//         break;
//       case 'write':
//         setAuthority('user');
//         break;
//       case 'read':
//         setAuthority('guest');
//         break;
//       default:
//         // setAuthority('null');
//         setAuthority('guest');
//     }
//     // if (!authority || authority === 'none') {
//     //   history.push('/no-authority');
//     //   extraRoutes = {
//     //     exact: true,
//     //     path: '/',
//     //     redirect: '/no-authority',
//     //   };
//     // }
//     oldRender();
//   } catch (e) {
//     setAuthority('null');
//     console.log("File to get user's authority. Details: ", e);
//     oldRender();
//   }
// }
//
// export function patchRoutes({ routes }: { routes: any[] }) {
//   if (extraRoutes) {
//     routes.unshift(extraRoutes);
//   }
// }
