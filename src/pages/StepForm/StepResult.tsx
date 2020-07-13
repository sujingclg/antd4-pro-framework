import React, { Fragment, Dispatch } from 'react';
import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Action, IStepsState } from './reducer';
import styles from './index.less';

const { Paragraph, Text } = Typography;

interface StepResultProps {
  stepsState: IStepsState;
  stepsDispatch: Dispatch<Action>;
}

const StepResult: React.FC<StepResultProps> = props => {
  const { stepsState, stepsDispatch } = props;

  const handleFinish = () => {
    stepsDispatch({ type: 'setCurrentStep', currentStep: 'info' });
  };

  return stepsState.finishStatus === 'error' ? (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={
        <Button type="primary" onClick={handleFinish}>
          返回修改
        </Button>
      }
    >
      <div className={styles.errorContent}>
        <Paragraph>
          <Text strong style={{ fontSize: 16 }}>
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className={styles.errorIcon} /> &nbsp; Your account has been frozen
          <a>Thaw immediately &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className={styles.errorIcon} /> &nbsp; Your account is not yet eligible to apply{' '}
          <a>Apply Unlock &gt;</a>
        </Paragraph>
      </div>
    </Result>
  ) : (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={
        <Fragment>
          <Button type="primary" onClick={handleFinish}>
            再创建一条
          </Button>
          <Button>返回</Button>
        </Fragment>
      }
    />
  );
};

export default StepResult;
