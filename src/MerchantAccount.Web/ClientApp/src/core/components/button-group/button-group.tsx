import classNames from 'classnames';
import { forwardRef } from 'react';
import { ButtonGroupBaseProps } from 'src/core/interfaces/components';

export interface ButtonGroupProps extends Partial<ButtonGroupBaseProps> {
  direction?: 'vertical' | 'horizontal';
}

/**
 * ButtonGroup component
 *
 */
const ButtonGroup = forwardRef(
  (
    {
      size,
      className,
      as: Component = 'div',
      direction,
      ...otherProps
    }: ButtonGroupProps,
    ref
  ) => {
    let bsPrefix = 'btn-group';
    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(
          direction === 'vertical' ? `${bsPrefix}-vertical` : bsPrefix,
          className,
          size && `${bsPrefix}-${size}`
        )}
      />
    );
  }
);

export default ButtonGroup;
