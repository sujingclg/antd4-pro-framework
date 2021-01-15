import React, { Fragment } from 'react';
import { PageHeader, Typography, Tabs } from 'antd';
import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd/lib/breadcrumb';
import classNames from 'classnames';
import { useIntl } from 'umi';
import GridContent from './GridContent';
import { WithFalse } from '../typings';
import RouteContext from '../RouteContext';
import getBreadcrumbProps from '../utils/getBreadcrumbProps';
import styles from './index.less';

const { Title } = Typography;
const { TabPane } = Tabs;

export interface PageHeaderWrapperProps<T = any> {
  title?: WithFalse<React.ReactNode>;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  hiddenBreadcrumb?: boolean;
  extraBreadcrumb?: AntdBreadcrumbProps['routes'];

  // Footer Props
  tabList?: {
    tab: string | React.ReactNode;
    key: string;
    disabled?: boolean;
  }[];
  activeTabKey?: T;
  onTabChange?: (activeKey: T) => void;
  tabBarExtraContent?: React.ReactNode;
}

const PageHeaderWrapper: React.FC<PageHeaderWrapperProps> = (props) => {
  const {
    title,
    content,
    extraContent,
    hiddenBreadcrumb,
    extraBreadcrumb,
    tabList,
    activeTabKey,
    onTabChange,
    tabBarExtraContent,
    children,
    ...restProps
  } = props;

  const intl = useIntl();

  const renderPageHeader = () =>
    content || extraContent ? (
      <div className={styles.detail}>
        <div className={styles.main}>
          <div className={styles.row}>
            {content && <div className={styles.content}>{content}</div>}
            {extraContent && (
              <div
                className={classNames(styles.extraContent, { [styles.withoutContent]: !content })}
              >
                {extraContent}
              </div>
            )}
          </div>
        </div>
      </div>
    ) : null;

  const renderFooter = () =>
    tabList && tabList.length ? (
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onTabChange && onTabChange(key)}
        tabBarExtraContent={tabBarExtraContent}
      >
        {tabList.map((item) => (
          <TabPane tab={item.tab} key={item.key} disabled={item.disabled} />
        ))}
      </Tabs>
    ) : null;

  const defaultPageHeaderRender = () => {
    const titleComponent = title ? (
      <Fragment>
        <Title level={4} style={{ marginBottom: 0, display: 'inline-block' }}>
          {title}
        </Title>
      </Fragment>
    ) : null;

    return (
      <RouteContext.Consumer>
        {(value) => (
          <PageHeader
            title={titleComponent}
            breadcrumb={
              hiddenBreadcrumb
                ? undefined
                : getBreadcrumbProps(value, extraBreadcrumb, intl.formatMessage)
            }
            {...restProps}
            footer={renderFooter()}
          >
            {renderPageHeader()}
          </PageHeader>
        )}
      </RouteContext.Consumer>
    );
  };

  return (
    <div style={{ margin: '-24px -24px 0' }} className={styles.main}>
      <div className={styles.wrapper}>
        <GridContent>{defaultPageHeaderRender()}</GridContent>
      </div>
      {children ? (
        <div className={styles.childrenContent}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  );
};

export { PageHeaderWrapper as default, GridContent };
