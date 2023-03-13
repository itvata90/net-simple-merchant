import classNames from 'classnames';
import { forwardRef } from 'react';
import { HeadingBaseProps } from 'src/core/interfaces/components';

export interface DropdownHeaderProps extends Partial<HeadingBaseProps> {}

/**
 * DropdownHeader component
 *
 */
const DropdownHeader = forwardRef(({ className, as: Component = 'h6', ...otherProps }: DropdownHeaderProps, ref) => {
  let bsPrefix = `dropdown-header`;
  return <Component {...otherProps} ref={ref} className={classNames(bsPrefix, className)} />;
});

export default DropdownHeader;
