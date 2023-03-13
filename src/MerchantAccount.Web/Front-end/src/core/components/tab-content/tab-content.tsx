import classNames from 'classnames';
import { ReactNode } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';

export interface TabPanelProps extends Partial<CommonProps & AsProp> {
  children?: ReactNode;
}
export interface TabContentProps extends Partial<CommonProps & AsProp> {
  children?: ReactNode;
}

const TabPanel = ({ className, as: Component = 'div', ...otherProps }: TabPanelProps) => {
  let bsPrefix = 'tab-panel';

  return <Component {...otherProps} className={classNames(bsPrefix, className)} />;
};

/**
 * TabContent component
 *
 */
const TabContent = ({
  className,

  as: Component = 'div',
  ...otherProps
}: TabContentProps) => {
  let bsPrefix = 'tab-content';

  return <Component {...otherProps} className={classNames(bsPrefix, className)} />;
};

export default Object.assign(TabContent, { Panel: TabPanel });
