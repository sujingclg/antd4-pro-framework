export interface ISettings {
  appName: string;
  CSSLayoutType: 'Fluid' | 'Fixed'; // | 'Elastic';
  menu: {
    locale: boolean;
  };
  title: string;
  iconfontUrl: string;
}

const defaultSettings: ISettings = {
  appName: 'antd4-pro-framework',
  CSSLayoutType: 'Fluid',
  menu: {
    locale: false,
  },
  title: 'Antd4 框架',
  iconfontUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
};

export default defaultSettings;
