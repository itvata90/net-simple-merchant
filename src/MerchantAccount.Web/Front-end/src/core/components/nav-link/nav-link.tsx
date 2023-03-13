import classNames from 'classnames';
import { forwardRef } from 'react';
import { AsProp, LinkBaseProps } from 'src/core/interfaces/components';

export interface NavLinkProps extends Partial<LinkBaseProps & AsProp> {
  disabled?: boolean;
  active?: boolean;
  eventKey?: string | number;
  to?: string;
}

const NavLink = forwardRef(
  ({ className, disabled, eventKey, children, active, as: Component = 'a', ...otherProps }: NavLinkProps, ref) => {
    let bsPrefix = 'nav-link';
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(bsPrefix, disabled && 'disabled', active && 'active', className)}
        data-bs-target={`#${eventKey}`}
      >
        {children}
      </Component>
    );
  },
);

export default NavLink;
