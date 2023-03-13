import classNames from 'classnames';
import { forwardRef } from 'react';
import { ListItemBaseProps } from 'src/core/interfaces/components';

export interface DropdownItemTextProps extends Partial<ListItemBaseProps> {
  containerClassName?: string;
}
/**
 * Dropdown component
 *
 */
const DropdownItemText = forwardRef(
  ({ as: Component = 'span', className, containerClassName, ...otherProps }: DropdownItemTextProps, ref) => {
    let bsPrefix = 'dropdown-item-text';
    return (
      <li className={containerClassName}>
        <Component {...otherProps} ref={ref} className={classNames(bsPrefix, className)} />;
      </li>
    );
  },
);

export default DropdownItemText;
