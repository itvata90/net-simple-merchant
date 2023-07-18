import classNames from 'classnames';
import { forwardRef } from 'react';
import { ListItemBaseProps } from 'src/core/interfaces/components';

export interface DropdownItemProps extends Partial<ListItemBaseProps> {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  containerClassName?: string;
}

/**
 * Dropdown component
 *
 */
const DropdownItem = forwardRef(
  (
    {
      className,
      children,
      as = 'a',
      href,
      disabled,
      active,
      onClick,
      containerClassName,
      ...otherProps
    }: DropdownItemProps,
    ref,
  ) => {
    let bsPrefix = 'dropdown-item';
    let Component = href ? 'a' : as;

    const handleClick = (event: any) => {
      event?.preventDefault();
      onClick && onClick(event);
    };
    let buttonProps =
      as === 'button'
        ? {
            type: 'button' as any,
            onClick: handleClick,
          }
        : {
            onClick: handleClick,
            href: href,
          };
    return (
      <li className={containerClassName}>
        <Component
          {...buttonProps}
          {...otherProps}
          ref={ref}
          href={href}
          className={classNames(
            bsPrefix,
            active && `active`,
            (href || as === 'a') && disabled && 'disabled',
            className,
          )}
        >
          {children}
        </Component>
      </li>
    );
  },
);

export default DropdownItem;
