import React from 'react';
import MenuProfile from '@/components/MenuProfile';
import PendingMask from '@/components/PendingMask';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <div>
      <MenuProfile showTitle>
        <MenuProfile.Item key="vxse" title="fdsd">
          <p>1232312</p>
        </MenuProfile.Item>
        <MenuProfile.Item key="32" title="121">
          <PendingMask visible />
        </MenuProfile.Item>
      </MenuProfile>
    </div>
  );
};

export default HomePage;
