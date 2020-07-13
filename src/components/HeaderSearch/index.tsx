import React, { memo, RefObject, useEffect, useRef, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.less';

interface HeaderSearchProps {
  placeholder?: string;
  defaultOpen?: boolean;
  dataSource?: string[];
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onPressEnter?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = props => {
  const {
    placeholder,
    defaultOpen = false,
    dataSource = [],
    onSearch,
    onChange,
    onPressEnter,
    onVisibleChange,
    className,
  } = props;
  const [searchMode, setSearchMode] = useState(defaultOpen);
  const [enteredValue, setEnteredValue] = useState('');
  const inputRef: RefObject<Input> = useRef(null);

  useEffect(() => {
    if (searchMode) {
      inputRef.current?.focus();
    }
  }, [searchMode]);

  // TODO 防抖
  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      onPressEnter && onPressEnter(enteredValue);
    }
  };

  const handleChange = (value: string) => {
    setEnteredValue(value);
    onSearch && onSearch(value);
    onChange && onChange(value);
  };

  const enterSearchMode = () => {
    onVisibleChange && onVisibleChange(true);
    setSearchMode(true);
  };

  const leaveSearchMode = () => {
    setSearchMode(false);
    setEnteredValue('');
  };

  const inputClsName = classNames(styles.input, {
    [styles.show]: searchMode,
  });

  return (
    <span
      className={classNames(className, styles.headerSearch)}
      onClick={enterSearchMode}
    >
      <SearchOutlined />
      <AutoComplete
        className={inputClsName}
        value={enteredValue}
        onChange={handleChange}
      >
        <Input
          ref={inputRef}
          placeholder={placeholder}
          aria-label={placeholder}
          onKeyDown={handleKeyDown}
          onBlur={leaveSearchMode}
        />
      </AutoComplete>
    </span>
  )
};

HeaderSearch.displayName = 'HeaderSearch';

export default memo(HeaderSearch);
