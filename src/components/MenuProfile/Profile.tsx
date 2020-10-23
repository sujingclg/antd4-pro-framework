import React from 'react';
import styles from './index.less';

interface ProfileProps {
  key: string;
  title: string;
  showTitle?: boolean;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { title, showTitle, children } = props;
  return (
    <>
      {showTitle && <div className={styles.title}>{title}</div>}
      {children}
    </>
  );
};

export default Profile;
