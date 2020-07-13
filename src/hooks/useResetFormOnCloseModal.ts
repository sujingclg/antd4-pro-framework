// https://ant.design/components/form-cn/#components-form-demo-form-context

import { useRef, useEffect } from 'react';
import { FormInstance } from 'antd/lib/form';

interface UseResetFormOnCloseModalFunc {
  (props: { form: FormInstance; visible: boolean }): void;
}

const useResetFormOnCloseModal: UseResetFormOnCloseModalFunc = ({ form, visible }) => {
  const prevVisibleRef = useRef<boolean>(visible);
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);

  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

export default useResetFormOnCloseModal;
