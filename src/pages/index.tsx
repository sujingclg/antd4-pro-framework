import React from 'react';
import MenuProfile from '@/components/MenuProfile';
import PendingMask from '@/components/PendingMask';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => (
  <GridContent>
    <MenuProfile showTitle>
      <MenuProfile.Item key="vxse" title="fdsd">
        <p>1232312</p>
      </MenuProfile.Item>
      <MenuProfile.Item key="32" title="121">
        <PendingMask visible />
      </MenuProfile.Item>
    </MenuProfile>
    <br />
    <br />
    <br />
    <br />
  </GridContent>
);

export default HomePage;
