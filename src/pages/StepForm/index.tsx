import React, { useMemo, useReducer } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { stepsReducer, initialState } from './reducer';
import Step0 from './Step0';
import StepConfirm from './StepConfirm';
import StepResult from './StepResult';
import styles from './index.less';

const { Step } = Steps;

interface StepFormProps {}

const StepForm: React.FC<StepFormProps> = (props) => {
  const [stepsState, stepsDispatch] = useReducer(stepsReducer, initialState);

  const { pageIndex, stepComponent } = useMemo(() => {
    switch (stepsState.currentStep) {
      case 'confirm':
        return {
          pageIndex: 1,
          stepComponent: <StepConfirm stepsState={stepsState} stepsDispatch={stepsDispatch} />,
        };
      case 'result':
        return {
          pageIndex: 2,
          stepComponent: <StepResult stepsState={stepsState} stepsDispatch={stepsDispatch} />,
        };
      default:
        return {
          pageIndex: 0,
          stepComponent: <Step0 stepsState={stepsState} stepsDispatch={stepsDispatch} />,
        };
    }
  }, [stepsState.currentStep]);

  const stepStatus = useMemo(() => {
    const { currentStep, finishStatus } = stepsState;
    return currentStep === 'result' && finishStatus === 'error' ? 'error' : 'process';
  }, [stepsState.currentStep, stepsState.finishStatus]);

  return (
    <PageHeaderWrapper title="创建作品">
      <Card bordered={false}>
        <Steps current={pageIndex} className={styles.steps} status={stepStatus}>
          <Step title="填写信息" />
          <Step title="确认信息" />
          <Step title="完成" />
        </Steps>
        {stepComponent}
      </Card>
    </PageHeaderWrapper>
  );
};

export default StepForm;
