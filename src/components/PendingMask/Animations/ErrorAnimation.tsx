import React, { memo } from 'react';
import styles from './ErrorAnimation.less';

// https://bootsnipp.com/snippets/2eEjz

const ErrorAnimation: React.FC = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.xMarkContainer}>
        <span className={styles.xMark}>
          <span className={styles.xMarkLineLeft} />
          <span className={styles.xMarkLineRight} />
        </span>
      </div>
    </div>
  );
};

export default memo(ErrorAnimation);
