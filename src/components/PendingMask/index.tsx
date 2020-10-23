import React, { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import { Timeline, Progress } from 'antd';
import TweenOne from 'rc-tween-one';
import { WaitingAnimation, SuccessAnimation, ErrorAnimation } from './Animations';
import styles from './index.less';

const Children = require('rc-tween-one/lib/plugin/ChildrenPlugin');

TweenOne.plugins.push(Children);

export interface PendingMaskProps {
  visible?: boolean;
  transparent?: boolean; // 是否半透明显示
  currentState?: 'pending' | 'fulfilled' | 'rejected';
  percent?: number;
  disappearDuration?: number;
  messageList?: string[];
}

const PendingMask: React.FC<PendingMaskProps> = (props) => {
  const {
    visible,
    transparent,
    currentState = 'pending',
    percent: propPercent = 0,
    disappearDuration = 3000,
    messageList = [],
  } = props;
  const percent = Math.abs(propPercent) > 1 ? 1 : propPercent;
  const [animation, setAnimation] = useState<any>(null);
  const [hideMask, setHideMask] = useState<boolean>(!visible);

  useEffect(() => {
    setAnimation({
      Children: {
        value: percent * 100,
        floatLength: 0,
      },
      duration: 1000,
    });
  }, [percent]);

  useEffect(() => {
    if (!visible) {
      if (currentState === 'fulfilled' || currentState === 'rejected') {
        setTimeout(() => {
          setHideMask(true);
        }, disappearDuration);
      }
    } else {
      setHideMask(false);
    }
  }, [visible]);

  const renderAnimation = () => {
    switch (currentState) {
      case 'fulfilled':
        return <SuccessAnimation />;
      case 'rejected':
        return <ErrorAnimation />;
      default:
        return <WaitingAnimation />;
    }
  };

  /**
   * 渲染出动态的进度数字
   */
  const renderProgressValue = () => (
    <div className={styles.progressValue}>
      <TweenOne animation={animation} style={{ display: 'inline-block' }}>
        0
      </TweenOne>
      %
    </div>
  );

  return (
    <Fragment>
      {hideMask ? null : (
        <div className={styles.main}>
          <div className={classNames(styles.contentBox, { [styles.opacity]: transparent })}>
            {renderAnimation()}
            {renderProgressValue()}
            <div>
              <Progress
                percent={percent * 100}
                showInfo={false}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                status="active"
              />
            </div>
            <div className={styles.details}>
              <Timeline pending={currentState === 'pending' ? 'Loading' : false} reverse>
                {/* eslint-disable-next-line react/no-array-index-key */}
                {['Start', ...messageList].map((msg, index) => (
                  <Timeline.Item key={index}>{msg}</Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PendingMask;
