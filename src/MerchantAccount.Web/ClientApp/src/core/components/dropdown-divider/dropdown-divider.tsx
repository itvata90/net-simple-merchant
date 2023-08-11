import classNames from 'classnames';
import { forwardRef } from 'react';
import { DividerBaseProps } from 'src/core/interfaces/components';

export interface DropdownDividerProps extends Partial<DividerBaseProps> {}

/**
 * DropdownDivider component
 *
 */
const DropdownDivider = forwardRef(
  (
    { className, as: Component = 'hr', ...otherProps }: DropdownDividerProps,
    ref
  ) => {
    let bsPrefix = `dropdown-divider`;
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default DropdownDivider;
