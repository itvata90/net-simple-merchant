import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { AsProp, CommonProps } from 'src/core/interfaces/components';
export interface NavItemProps extends Partial<CommonProps & HTMLAttributes<HTMLElement> & AsProp> {
  active?: boolean;
}

const NavItem = forwardRef(({ className, as: Component = 'div', active, ...otherProps }: NavItemProps, ref) => {
  let bsPrefix = 'nav-item';
  return <Component {...otherProps} ref={ref} className={classNames(bsPrefix, active && 'active', className)} />;
});

export default NavItem;
