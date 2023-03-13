import classNames from 'classnames';
import { forwardRef } from 'react';
import { createBreakpointsClassName } from 'src/core/functions/create_breakpoints_class_name';
import { Breakpoints, ListBaseProps } from 'src/core/interfaces/components';

export type MenuAlign = 'start' | 'end';

export interface DropdownMenuProps extends Partial<ListBaseProps> {
  align?: MenuAlign | Breakpoints<MenuAlign>;
  flip?: boolean;
}

/**
 * DropdownMenu component
 *
 */
const DropdownMenu = forwardRef(({ className, align, flip, ...otherProps }: DropdownMenuProps, ref) => {
  let bsPrefix = 'dropdown-menu';
  let alignClassName = createBreakpointsClassName(bsPrefix, align);
  return <ul {...otherProps} ref={ref as any} className={classNames(bsPrefix, align && alignClassName, className)} />;
});

export default DropdownMenu;
