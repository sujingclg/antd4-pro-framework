import axiosInstance from '@/utils/axiosInstance';
import { ICurrentUser } from '@/components/typings';
import { IBaseResponse, IBackendUserItem } from '@/data';

export async function queryCurrentUser(): Promise<ICurrentUser | void> {
  try {
    const {
      data: {
        data: { picture, ...restProps },
      },
    } = await axiosInstance.get<IBaseResponse<IBackendUserItem>>('/whoami');
    return { ...restProps, avatar: picture };
  } catch (e) {
    console.log("Fail to get user's information. Details: ", e);
  }
}

export async function requestLogout(): Promise<void> {
  try {
    await axiosInstance.get('/user/exit');
  } catch (e) {
    console.log('Fail to logout. Details: ', e);
  }
}
