import classNames from 'classnames';
import { forwardRef } from 'react';
import { Color, Size, SpinnerBaseProps } from 'src/core/interfaces/components';

export interface SpinnerProps extends Partial<SpinnerBaseProps> {
  variant?: 'grow' | 'border';
  color?: Color;
  size?: Size;
}

/**
 * Spinner component
 *
 */
const Spinner = forwardRef(
  (
    {
      className,
      as: Component = 'div',
      variant = 'border',
      color,
      size,
      ...otherProps
    }: SpinnerProps,
    ref
  ) => {
    let bsPrefix = `spinner-${variant}`;
    let colorPrefix = 'text';

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          bsPrefix,
          size && `${bsPrefix}-${size}`,
          color && `${colorPrefix}-${color}`,
          className
        )}
      />
    );
  }
);

export default Spinner;
