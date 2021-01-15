import React from 'react';
import PendingMask from '@/components/PendingMask';
import { GridContent } from '@/components/PageHeaderWrapper';

interface ShowPendingProps {}

const ShowPending: React.FC<ShowPendingProps> = (props) => (
  <GridContent>
    <div style={{ height: 300 }}>
      <PendingMask visible />
    </div>
  </GridContent>
);

export default ShowPending;
