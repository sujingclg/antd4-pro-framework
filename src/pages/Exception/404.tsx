import React from 'react';
import { useIntl } from 'umi';
import Exception from '@/components/Exception';

export default () => {
  const intl = useIntl();
  return (
    <div>
      <Exception
        type={404}
        desc={intl.formatMessage({ id: 'exception.description.404' })}
        backText={intl.formatMessage({ id: 'exception.back' })}
      />
    </div>
  );
};
