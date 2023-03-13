import classNames from 'classnames';
import { Dropdown as BsDropdown } from 'bootstrap';
import { ElementType, useEffect, useRef, useState } from 'react';
import Button from 'src/core/components/button/button';
import { ButtonBaseProps } from 'src/core/interfaces/components';

export interface DropdownToggleProps extends Partial<Omit<ButtonBaseProps, 'as'>> {
  href?: string;
  disabled?: boolean;
  show?: boolean;
  split?: boolean;
  menuReference?: Element | 'parent' | 'toggle';
  menuOffset?: { top: number | string; left: number | string };
  autoClose?: boolean | 'inside' | 'outside';
  as?: ElementType<any>;
}

/**
 * DropdownToggle component
 *
 */
const DropdownToggle = ({
  className,
  children,
  disabled,
  as: Component = Button,
  show = false,
  split,
  onClick,
  menuReference = 'parent',
  menuOffset,
  autoClose = true,
  ...otherProps
}: DropdownToggleProps) => {
  let bsPrefix = 'dropdown-toggle';
  let dropDownRef = useRef<any>();
  const [toggle, setToggle] = useState(show);

  useEffect(() => {
    if (dropDownRef) {
      let dropdown = dropDownRef.current;
      let bsDropdown = new BsDropdown(dropdown, {
        reference: menuReference,
        autoClose,
      });
      toggle ? bsDropdown.show() : bsDropdown.hide();
      dropdown.addEventListener('hidden.bs.dropdown', () => {
        setToggle(false);
      });
    }
  }, [toggle, autoClose, menuReference]);

  const handleClick = (event: any) => {
    event?.preventDefault();
    setToggle(!toggle);
    onClick && onClick(event);
  };

  let menuProps: { [key: string]: any } = {};
  menuProps['data-bs-offset'] = menuOffset && `${menuOffset?.left},${menuOffset?.top}`;

  return (
    <Component
      {...menuProps}
      {...otherProps}
      disabled={disabled}
      ref={dropDownRef}
      onClick={handleClick}
      className={classNames(bsPrefix, split && `${bsPrefix}-split`, className)}
      data-bs-toggle="dropdown"
    >
      {children}
    </Component>
  );
};

export default DropdownToggle;
