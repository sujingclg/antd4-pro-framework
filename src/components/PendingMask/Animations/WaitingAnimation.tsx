import React from 'react';
import styles from './WaitingAnimation.less';

const WaitingAnimation: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.base}>
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
        <div className={styles.cube} />
      </div>
    </div>
  );
};

export default WaitingAnimation;
