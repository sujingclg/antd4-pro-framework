import React from 'react';
import classNames from 'classnames';
import { ISettings } from '@/defaultSettings';
import RouteContext from '../RouteContext';
import styles from './GridContent.less';

interface GridContentProps {
  CSSLayoutType?: ISettings['CSSLayoutType'];
}

const GridContent: React.FC<GridContentProps> = (props) => {
  const { children, CSSLayoutType: propsCSSLayoutType } = props;
  return (
    <RouteContext.Consumer>
      {(value) => {
        const CSSLayoutType = propsCSSLayoutType || value.CSSLayoutType;
        const clsString = classNames(styles.main, { [styles.wide]: CSSLayoutType === 'Fixed' });
        return <div className={clsString}>{children}</div>;
      }}
    </RouteContext.Consumer>
  );
};

export default GridContent;
