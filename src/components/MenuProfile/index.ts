import ProfileLayout from './ProfileLayout';
import Profile from './Profile';

type InternalMenuProfileType = typeof ProfileLayout;
interface IMenuProfile extends InternalMenuProfileType {
  Item: typeof Profile;
}

const MenuProfile = ProfileLayout as IMenuProfile;
MenuProfile.Item = Profile;

export default MenuProfile as IMenuProfile;
