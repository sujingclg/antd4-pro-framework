import axios from '@/utils/axios';
import { ICurrentUser } from '@/components/typings';
import { IBaseResponse, IBackendUserItem } from '@/data';

export async function queryCurrentUser(): Promise<ICurrentUser | void> {
  try {
    const {
      data: { data },
    } = await axios.get<IBaseResponse<IBackendUserItem>>('/whoami');
    return {
      username: data.username,
      name: data.name,
      email: data.email,
      avatar: data.picture,
    };
  } catch (e) {
    console.log("Fail to get user's information. Details: ", e);
  }
}

export async function requestLogout(): Promise<void> {
  try {
    await axios.get('/user/exit');
  } catch (e) {
    console.log('Fail to logout. Details: ', e);
  }
}
