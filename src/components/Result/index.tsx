import React, { memo } from 'react';
import classNames from 'classnames';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import styles from './index.less';

interface ResultProps {
  type: 'success' | 'error';
  title: React.ReactNode;
  description?: string;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Result: React.FC<ResultProps> = props => {
  const { type, title, description, extra, actions, className, style } = props;

  const iconMap = {
    success: <CheckCircleFilled className={styles.success} />,
    error: <CloseCircleFilled className={styles.error} />,
  };

  return (
    <div className={classNames(styles.result, className)} style={style}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default memo(Result);
