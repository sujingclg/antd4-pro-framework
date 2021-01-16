import React, { memo } from 'react';
import classNames from 'classnames';
import styles from './SuccessAnimation.less';

const SuccessAnimation: React.FC = () => (
  <div className={styles.main}>
    <div className={styles.successCheckmark}>
      <div className={styles.checkIcon}>
        <span className={classNames(styles.iconLine, styles.lineTip)} />
        <span className={classNames(styles.iconLine, styles.lineLong)} />
        <div className={styles.iconCircle} />
        <div className={styles.iconFix} />
      </div>
    </div>
  </div>
);

export default memo(SuccessAnimation);
