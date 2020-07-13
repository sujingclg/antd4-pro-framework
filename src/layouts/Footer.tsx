import React, { Fragment, memo } from 'react';
import { Layout } from 'antd';
import { CopyrightCircleOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;

const FooterView: React.FC<{}> = memo(props => {
  const intl = useIntl();
  return (
    <Footer>
      <GlobalFooter
      // links={[
      //   {
      //     key: 'help',
      //     title: intl.formatMessage({ id: 'component.globalFooter.help' }),
      //     href: 'https://bytedance.feishu.cn/docs/doccnSOhAQulOXJFqvMmsJN3lTg',
      //     isBlankTarget: true,
      //   },
      // ]}
      // copyright={
      //   <Fragment>
      //     <CopyrightCircleOutlined/> {intl.formatMessage({ id: 'component.globalFooter.copyright' })}
      //   </Fragment>
      // }
      />
    </Footer>
  );
});

export default FooterView;
