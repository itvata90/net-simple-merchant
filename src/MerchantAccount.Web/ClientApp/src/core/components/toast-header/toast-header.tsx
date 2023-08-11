import classNames from 'classnames';
import { forwardRef } from 'react';
import { HeadingBaseProps } from 'src/core/interfaces/components';

export interface ToastHeaderProps extends Partial<HeadingBaseProps> {}

/**
 * ToastHeader component
 *
 */
const ToastHeader = forwardRef(
  (
    { className, as: Component = 'div', ...otherProps }: ToastHeaderProps,
    ref
  ) => {
    let bsPrefix = 'toast-header';

    return (
      <Component
        {...otherProps}
        ref={ref}
        className={classNames(bsPrefix, className)}
      />
    );
  }
);

export default ToastHeader;
