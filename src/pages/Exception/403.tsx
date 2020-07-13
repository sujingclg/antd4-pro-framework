import React from 'react';
import { useIntl } from 'umi';
import Exception from '@/components/Exception';

export default () => {
  const intl = useIntl();
  return (
    <div>
      <Exception
        type={403}
        desc={intl.formatMessage({ id: 'exception.description.403' })}
        backText={intl.formatMessage({ id: 'exception.back' })}
      />
    </div>
  );
};
