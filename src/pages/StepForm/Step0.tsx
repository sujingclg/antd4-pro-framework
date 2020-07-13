import React, { Dispatch } from 'react';
import { Form, Input, Button } from 'antd';
import { IStepsState, Action } from './reducer';
import styles from './index.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface Step0Props {
  stepsState: IStepsState;
  stepsDispatch: Dispatch<Action>;
}

const Step0: React.FC<Step0Props> = props => {
  const { stepsState, stepsDispatch } = props;

  const handleFinish = (values: any) => {
    console.log(values);
    stepsDispatch({ type: 'clickNextStep', payload: { formData: values, currentStep: 'confirm' } });
  };

  return (
    <Form
      {...formItemLayout}
      onFinish={handleFinish}
      initialValues={stepsState.formData}
      className={styles.stepForm}
      hideRequiredMark
    >
      <FormItem label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <Input allowClear />
      </FormItem>
      <FormItem label="项目名称" name="projectName" rules={[{ required: true, message: '请输入项目名称' }]}>
        <Input allowClear />
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
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </FormItem>
    </Form>
  );
};

export default Step0;
