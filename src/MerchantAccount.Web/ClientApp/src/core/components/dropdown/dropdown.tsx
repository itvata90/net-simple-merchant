import classNames from 'classnames';
import { forwardRef } from 'react';
import DropdownDivider from 'src/core/components/dropdown-divider/dropdown-divider';
import DropdownHeader from 'src/core/components/dropdown-header/dropdown-header';
import DropdownItemText from 'src/core/components/dropdown-item-text/dropdown-item-text';
import DropdownItem from 'src/core/components/dropdown-item/dropdown-item';
import DropdownMenu from 'src/core/components/dropdown-menu/dropdown-menu';
import DropdownToggle from 'src/core/components/dropdown-toggle/dropdown-toggle';
import { DropdownBaseProps } from 'src/core/interfaces/components';

export interface DropdownProps extends Partial<DropdownBaseProps> {
  drop?: 'up' | 'start' | 'end' | 'down';
  centered?: boolean;
}

/**
 * Dropdown component
 *
 */
const Dropdown = forwardRef(
  (
    {
      className,
      as: Component = 'div',
      drop = 'down',
      centered = false,
      ...otherProps
    }: DropdownProps,
    ref
  ) => {
    let bsPrefix = `drop${drop}`;

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          centered && `${bsPrefix}-center`,
          className
        )}
      />
    );
  }
);

export default Object.assign(Dropdown, {
  Menu: DropdownMenu,
  Item: DropdownItem,
  Toggle: DropdownToggle,
  ItemText: DropdownItemText,
  Header: DropdownHeader,
  Divider: DropdownDivider,
});
