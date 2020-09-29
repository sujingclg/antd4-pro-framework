import React, { Dispatch, useState } from 'react';
import { Form, Button } from 'antd';
import { sleep } from '@/utils/utils';
import { IStepsState, Action } from './reducer';
import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface StepConfirmProps {
  stepsState: IStepsState;
  stepsDispatch: Dispatch<Action>;
}

const StepConfirm: React.FC<StepConfirmProps> = (props) => {
  const { stepsState, stepsDispatch } = props;

  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    await sleep(1000);
    setLoading(false);
    const finishStatus = Math.floor(Math.random() + 0.5) ? 'success' : 'error';
    stepsDispatch({ type: 'submitData', payload: { currentStep: 'result', finishStatus } });
  };

  return (
    <Form {...formItemLayout} onFinish={handleFinish} className={styles.stepForm}>
      <FormItem label="名称" className={styles.stepFormText}>
        {stepsState.formData.name}
      </FormItem>
      <FormItem label="项目名称" className={styles.stepFormText}>
        {stepsState.formData.projectName}
      </FormItem>
      <FormItem
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
        <Button
          onClick={() => stepsDispatch({ type: 'setCurrentStep', currentStep: 'info' })}
          style={{ margin: 8 }}
        >
          上一步
        </Button>
      </FormItem>
    </Form>
  );
};

export default StepConfirm;
